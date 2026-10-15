"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { asset } from "@/lib/site";

type OcctMesh = {
  color?: number[];
  attributes: { position: { array: number[] }; normal?: { array: number[] } };
  index: { array: number[] };
};

type OcctResult = { success: boolean; meshes: OcctMesh[] };
type OcctModule = { ReadStepFile: (content: Uint8Array, options: object | null) => OcctResult };

declare global {
  interface Window { occtimportjs?: (options?: object) => Promise<OcctModule> }
}

export type StepModel = {
  id: string;
  label: string;
  file: string;
  note: string;
  rotation?: readonly [number, number, number];
};

let occtPromise: Promise<OcctModule> | null = null;

function loadOcct() {
  if (occtPromise) return occtPromise;
  occtPromise = new Promise<OcctModule>((resolve, reject) => {
    const start = () => window.occtimportjs?.({ locateFile: (name: string) => asset(`/vendor/occt/${name}`) }).then(resolve, reject);
    if (window.occtimportjs) return start();
    const script = document.createElement("script");
    script.src = asset("/vendor/occt/occt-import-js.js");
    script.async = true;
    script.onload = start;
    script.onerror = () => reject(new Error("The STEP reader could not load."));
    document.head.appendChild(script);
  });
  return occtPromise;
}

const BACKGROUND = 0xeceae4;
const PART_COLORS = [0xb9bec7, 0x9aa3b0, 0x3d5a99, 0xc7cbd2, 0x8a93a1, 0x2f4a85];

/** Interactive viewer that parses original STEP exports in the browser. */
export default function StepViewer({ models, initial = 0, deflection = 0.05, title, intro }: {
  models: StepModel[];
  initial?: number;
  deflection?: number;
  title: string;
  intro: string;
}) {
  const [selected, setSelected] = useState(initial);
  const [status, setStatus] = useState("Loading CAD…");
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const autoRotateRef = useRef(true);
  const model = models[selected];
  const rotation = model.rotation ?? [0, 0, 0];

  useEffect(() => { autoRotateRef.current = autoRotate; }, [autoRotate]);
  useEffect(() => {
    modelRef.current?.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) child.material.wireframe = wireframe;
    });
  }, [wireframe]);

  useEffect(() => {
    const host = stageRef.current;
    if (!host) return;
    let cancelled = false;
    let frame = 0;
    setStatus("Loading CAD…");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.prepend(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b4aa, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(4, 8, 6); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.9); fill.position.set(-6, 2, 4); scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controlsRef.current = controls;

    const resize = () => {
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    loadOcct().then(async (occt) => {
      const response = await fetch(asset(model.file));
      if (!response.ok) throw new Error("The model file could not be downloaded.");
      const parsed = occt.ReadStepFile(new Uint8Array(await response.arrayBuffer()), { linearUnit: "millimeter", linearDeflection: deflection, angularDeflection: 0.35 });
      if (!parsed.success || !parsed.meshes.length) throw new Error("The STEP geometry could not be triangulated.");
      if (cancelled) return;

      const group = new THREE.Group();
      parsed.meshes.forEach((mesh, index) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(mesh.attributes.position.array, 3));
        if (mesh.attributes.normal) geometry.setAttribute("normal", new THREE.Float32BufferAttribute(mesh.attributes.normal.array, 3));
        else geometry.computeVertexNormals();
        geometry.setIndex(mesh.index.array);
        const color = PART_COLORS[parsed.meshes.length === 1 ? 0 : index % PART_COLORS.length];
        group.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, metalness: 0.15, roughness: 0.55, wireframe })));
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 34), new THREE.LineBasicMaterial({ color: 0x2b2f38, transparent: true, opacity: 0.35 })));
      });

      // Center the parts inside a pivot so rotation happens about the model's center.
      const box = new THREE.Box3().setFromObject(group);
      group.position.sub(box.getCenter(new THREE.Vector3()));
      const pivot = new THREE.Group();
      pivot.add(group);
      pivot.rotation.set(...rotation);
      const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
      const distance = (radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.05;
      camera.near = Math.max(radius / 100, 0.01);
      camera.far = radius * 100;
      camera.position.copy(new THREE.Vector3(1, 0.7, 1).normalize().multiplyScalar(distance));
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.saveState();
      controls.update();
      modelRef.current = pivot;
      scene.add(pivot);
      setStatus("Original SolidWorks export");
    }).catch((error: Error) => { if (!cancelled) setStatus(error.message); });

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (modelRef.current && autoRotateRef.current) modelRef.current.rotation.y += 0.003;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
          child.geometry.dispose();
          (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => material.dispose());
        }
      });
      modelRef.current = null;
      controlsRef.current = null;
    };
    // The scene is rebuilt only when a different model is chosen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const resetView = () => {
    controlsRef.current?.reset();
    modelRef.current?.rotation.set(...rotation);
  };

  return (
    <div className="viewer">
      <div className="viewer-panel">
        <h3>{title}</h3>
        <p>{intro}</p>
        <div className="segmented" role="group" aria-label="Choose a model">
          {models.map((item, index) => (
            <button type="button" aria-pressed={index === selected} key={item.id} onClick={() => setSelected(index)}>{item.label}</button>
          ))}
        </div>
        <p className="viewer-note">{model.note}</p>
        <div className="viewer-actions">
          <button type="button" onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? "Pause" : "Rotate"}</button>
          <button type="button" onClick={() => setWireframe((value) => !value)}>{wireframe ? "Solid" : "Wireframe"}</button>
          <button type="button" onClick={resetView}>Reset</button>
          <a href={asset(model.file)} download>Download STEP</a>
        </div>
        <p className="fine">Drag to rotate, scroll to zoom, right-drag to pan.</p>
      </div>
      <div className="viewer-stage" ref={stageRef}>
        <span className="viewer-status">{status}</span>
      </div>
    </div>
  );
}
