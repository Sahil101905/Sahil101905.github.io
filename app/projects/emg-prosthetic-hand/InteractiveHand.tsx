"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

const modelFile = "/models/emg-prosthetic/finger-linkage-assembly.step";
let occtPromise: Promise<OcctModule> | null = null;

function loadOcct() {
  if (occtPromise) return occtPromise;
  occtPromise = new Promise<OcctModule>((resolve, reject) => {
    const start = () => window.occtimportjs?.({ locateFile: (name: string) => `/vendor/occt/${name}` }).then(resolve, reject);
    if (window.occtimportjs) return start();
    const script = document.createElement("script");
    script.src = "/vendor/occt/occt-import-js.js";
    script.async = true;
    script.onload = start;
    script.onerror = () => reject(new Error("The STEP reader could not load."));
    document.head.appendChild(script);
  });
  return occtPromise;
}

export default function InteractiveHand() {
  const [status, setStatus] = useState("Loading original CAD...");
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const autoRotateRef = useRef(true);

  useEffect(() => { autoRotateRef.current = autoRotate; }, [autoRotate]);
  useEffect(() => {
    modelRef.current?.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => { if (material instanceof THREE.MeshStandardMaterial) material.wireframe = wireframe; });
      }
    });
  }, [wireframe]);

  useEffect(() => {
    const host = stageRef.current;
    if (!host) return;
    let cancelled = false;
    let frame = 0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030409);
    const camera = new THREE.PerspectiveCamera(38, 1, .01, 100000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    host.prepend(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x151127, 3));
    const key = new THREE.DirectionalLight(0xffffff, 5.6); key.position.set(5, 7, 8); scene.add(key);
    const fill = new THREE.DirectionalLight(0xb9b3ff, 3); fill.position.set(-4, 1, 5); scene.add(fill);
    const rim = new THREE.DirectionalLight(0x725cff, 6); rim.position.set(-7, 3, -6); scene.add(rim);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = .07;
    controlsRef.current = controls;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();

    loadOcct().then(async (occt) => {
      const response = await fetch(modelFile);
      if (!response.ok) throw new Error("The model file could not be downloaded.");
      const parsed = occt.ReadStepFile(new Uint8Array(await response.arrayBuffer()), { linearUnit: "millimeter", linearDeflection: .001, angularDeflection: .35 });
      if (!parsed.success || !parsed.meshes.length) throw new Error("The STEP geometry could not be triangulated.");
      if (cancelled) return;

      const group = new THREE.Group();
      const accents = [0xdad8e6, 0xc4c1d4, 0x8e84ff, 0xdad8e6, 0xb4b0c7, 0x6f63ff];
      parsed.meshes.forEach((mesh, index) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(mesh.attributes.position.array, 3));
        if (mesh.attributes.normal) geometry.setAttribute("normal", new THREE.Float32BufferAttribute(mesh.attributes.normal.array, 3)); else geometry.computeVertexNormals();
        geometry.setIndex(mesh.index.array);
        const color = new THREE.Color(accents[index % accents.length]);
        const material = new THREE.MeshPhysicalMaterial({ color, metalness: .44, roughness: .25, clearcoat: .68, clearcoatRoughness: .2, wireframe });
        group.add(new THREE.Mesh(geometry, material));
        const edges = new THREE.EdgesGeometry(geometry, 34);
        group.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xc5c0ff, transparent: true, opacity: .24 })));
      });

      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      group.position.sub(center);
      group.rotation.set(-.18, -.35, .06);
      const radius = Math.max(size.x, size.y, size.z) * .7;
      const grid = new THREE.GridHelper(radius * 5, 20, 0x6f61ff, 0x20212d);
      grid.position.y = -radius * .72;
      grid.material.transparent = true;
      grid.material.opacity = .3;
      scene.add(grid);
      camera.near = Math.max(radius / 100, .01);
      camera.far = radius * 100;
      camera.position.set(radius * 1.55, radius * 1.1, radius * 1.55);
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.update();
      modelRef.current = group;
      scene.add(group);
      setStatus("Original six-body SolidWorks assembly");
    }).catch((error: Error) => { if (!cancelled) setStatus(error.message); });

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (modelRef.current && autoRotateRef.current) modelRef.current.rotation.y += .0035;
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
  }, []);

  const resetView = () => {
    controlsRef.current?.reset();
    modelRef.current?.rotation.set(-.18, -.35, .06);
  };

  return <section className="project-explorer emg-cad-explorer" id="cad" aria-labelledby="emg-cad-heading">
    <div className="explorer-copy">
      <p className="case-kicker">Interactive original CAD</p>
      <h2 id="emg-cad-heading">Inspect the finger linkage assembly.</h2>
      <p>This is the original six-body STEP assembly exported from the team&apos;s SolidWorks mechanism. Rotate it to inspect the knuckle, phalanx links, and connecting members.</p>
      <div className="emg-model-facts"><div><span>Format</span><strong>STEP AP214</strong></div><div><span>Assembly</span><strong>6 solid bodies</strong></div><div><span>Source</span><strong>SolidWorks 2024</strong></div></div>
      <div className="cad-actions">
        <a href={modelFile} download>Download STEP</a>
        <button onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? "Pause rotation" : "Auto-rotate"}</button>
        <button onClick={() => setWireframe((value) => !value)}>{wireframe ? "Solid view" : "Wireframe"}</button>
        <button onClick={resetView}>Reset view</button>
      </div>
      <p className="model-disclaimer">Drag to rotate &middot; scroll to zoom &middot; right-drag to pan. This is a geometry viewer, not a kinematic or load simulation.</p>
    </div>
    <div className="lattice-stage cad-stage" ref={stageRef}>
      <div className="cad-status"><span>MECHANISM</span><strong>Finger linkage assembly</strong><span>SOURCE</span><strong>{status}</strong></div>
      <button className="fullscreen-button" onClick={() => stageRef.current?.requestFullscreen()}>Fullscreen &nearr;</button>
    </div>
  </section>;
}
