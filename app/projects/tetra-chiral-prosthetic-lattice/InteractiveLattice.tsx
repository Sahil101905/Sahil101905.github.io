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

const variants = [
  { id: "I", label: "Unit Cell I", file: "/models/tetra-chiral/unit-cell-1.step", note: "Original full-scale tetra-chiral unit-cell geometry exported from SolidWorks." },
  { id: "II", label: "Unit Cell II", file: "/models/tetra-chiral/unit-cell-2.step", note: "Original second design iteration used for the scaled comparison study." },
  { id: "III", label: "Unit Cell III", file: "/models/tetra-chiral/unit-cell-3.step", note: "Original reduced-thickness geometry used in the final nonlinear simulation study." },
  { id: "ASTM", label: "ASTM control", file: "/models/tetra-chiral/astm-cylinder.step", note: "Original cylindrical control specimen used to characterize the printed material response." },
];

const results = [
  { id: "displacement", label: "Displacement", image: "/projects/tetra-chiral/displacement.jpg", copy: "Original displacement result exported from the Unit Cell III nonlinear study." },
  { id: "strain", label: "Strain", image: "/projects/tetra-chiral/strain.jpg", copy: "Original strain distribution exported from the Unit Cell III nonlinear study." },
  { id: "stress", label: "Stress", image: "/projects/tetra-chiral/stress.jpg", copy: "Original stress distribution exported from the Unit Cell III nonlinear study." },
  { id: "response", label: "Response", image: "/projects/tetra-chiral/response.jpg", copy: "Original nonlinear response plot exported from the simulation study." },
];

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

export default function InteractiveLattice() {
  const [selected, setSelected] = useState(2);
  const [result, setResult] = useState(0);
  const [status, setStatus] = useState("Loading original CAD…");
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const autoRotateRef = useRef(true);
  const variant = variants[selected];
  const activeResult = results[result];

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
    setStatus("Loading original CAD…");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05060a);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.prepend(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xe8e7ff, 0x1b1d29, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 4.4); key.position.set(4, 6, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(0x6658ff, 4); rim.position.set(-6, 2, -5); scene.add(rim);
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

    const fit = (group: THREE.Group) => {
      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      group.position.sub(center);
      const radius = Math.max(size.x, size.y, size.z) * .72;
      camera.near = Math.max(radius / 100, .01);
      camera.far = radius * 100;
      camera.position.set(radius * 1.45, radius * 1.05, radius * 1.45);
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.update();
    };

    loadOcct().then(async (occt) => {
      const response = await fetch(variant.file);
      if (!response.ok) throw new Error("The model file could not be downloaded.");
      const parsed = occt.ReadStepFile(new Uint8Array(await response.arrayBuffer()), { linearUnit: "millimeter", linearDeflection: .001, angularDeflection: .35 });
      if (!parsed.success || !parsed.meshes.length) throw new Error("The STEP geometry could not be triangulated.");
      if (cancelled) return;
      const group = new THREE.Group();
      parsed.meshes.forEach((mesh) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(mesh.attributes.position.array, 3));
        if (mesh.attributes.normal) geometry.setAttribute("normal", new THREE.Float32BufferAttribute(mesh.attributes.normal.array, 3)); else geometry.computeVertexNormals();
        geometry.setIndex(mesh.index.array);
        const color = mesh.color ? new THREE.Color(mesh.color[0] / 255, mesh.color[1] / 255, mesh.color[2] / 255) : new THREE.Color(0x8f8aa8);
        const material = new THREE.MeshStandardMaterial({ color, metalness: .34, roughness: .3, wireframe });
        group.add(new THREE.Mesh(geometry, material));
      });
      modelRef.current = group;
      scene.add(group);
      fit(group);
      setStatus("Original SolidWorks geometry");
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
        if (child instanceof THREE.Mesh) { child.geometry.dispose(); (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => material.dispose()); }
      });
      modelRef.current = null;
      controlsRef.current = null;
    };
  }, [selected]);

  const resetView = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.reset();
    modelRef.current?.rotation.set(0, 0, 0);
  };

  return <>
    <section className="project-explorer" aria-labelledby="geometry-heading">
      <div className="explorer-copy">
        <p className="case-kicker">Interactive original CAD</p>
        <h2 id="geometry-heading">Compare the design iterations.</h2>
        <p>{variant.note}</p>
        <div className="variant-tabs" role="group" aria-label="Choose specimen geometry">
          {variants.map((item, index) => <button className={index === selected ? "active" : ""} key={item.id} onClick={() => setSelected(index)}>{item.label}</button>)}
        </div>
        <div className="cad-actions">
          <a href={variant.file} download>Download STEP</a>
          <button onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? "Pause rotation" : "Auto-rotate"}</button>
          <button onClick={() => setWireframe((value) => !value)}>{wireframe ? "Solid view" : "Wireframe"}</button>
          <button onClick={resetView}>Reset view</button>
        </div>
        <p className="model-disclaimer">Drag to rotate · scroll to zoom · right-drag to pan. Geometry is parsed directly from the original SolidWorks STEP export.</p>
      </div>
      <div className="lattice-stage cad-stage" ref={stageRef}>
        <div className="cad-status"><span>SPECIMEN</span><strong>{variant.label}</strong><span>SOURCE</span><strong>{status}</strong></div>
        <button className="fullscreen-button" onClick={() => stageRef.current?.requestFullscreen()}>Fullscreen ↗</button>
      </div>
    </section>

    <section className="result-explorer" aria-labelledby="results-heading">
      <div className="result-heading"><div><p className="case-kicker">Nonlinear simulation</p><h2 id="results-heading">Inspect the evidence.</h2></div><p>The result viewer presents the original SolidWorks Simulation exports without converting their color scales into unsupported performance claims.</p></div>
      <div className="result-tabs" role="tablist" aria-label="Simulation result type">
        {results.map((item, index) => <button role="tab" aria-selected={index === result} className={index === result ? "active" : ""} key={item.id} onClick={() => setResult(index)}>{item.label}</button>)}
      </div>
      <figure className="result-frame"><img src={activeResult.image} alt={`${activeResult.label} result exported from the Unit Cell III nonlinear simulation`} /><figcaption><strong>{activeResult.label}</strong>{activeResult.copy}</figcaption></figure>
    </section>
  </>;
}
