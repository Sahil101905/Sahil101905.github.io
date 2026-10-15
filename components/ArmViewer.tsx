"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { asset } from "@/lib/site";

const BACKGROUND = 0xeceae4;
const DIR = "/models/morph-claw-arm";

// Parts that don't move between poses, then the ones exported once per pose.
const FIXED = [
  { file: "base", color: 0x6b6f76 },
  { file: "stepper", color: 0xa8acb2 },
  { file: "turret", color: 0xd9d4c8 },
  { file: "servos", color: 0x2b2f38 },
];
const POSED = [
  { file: "ua", color: 0xd9d4c8 },
  { file: "fa", color: 0xd9d4c8 },
  { file: "crank", color: 0xc9c2b4 },
  { file: "rod", color: 0xc9c2b4 },
  { file: "hw", color: 0x3a3d42 },
  { file: "claw_plate", color: 0xd9d4c8 },
  { file: "claw_servo", color: 0x2b2f38 },
  { file: "claw_sun", color: 0x3d5a99 },
  { file: "claw_fingers", color: 0x3d5a99 },
];

export type ArmPose = { id: string; label: string; note: string };

/** Viewer for the arm assembly, posed in CAD and exported per pose. */
export default function ArmViewer({ poses, title, intro }: { poses: ArmPose[]; title: string; intro: string }) {
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState("Loading model…");
  const [autoRotate, setAutoRotate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<THREE.Group | null>(null);
  const poseGroupsRef = useRef<Record<string, THREE.Group>>({});
  const controlsRef = useRef<OrbitControls | null>(null);
  const autoRotateRef = useRef(true);
  const selectedRef = useRef(0);

  useEffect(() => { autoRotateRef.current = autoRotate; }, [autoRotate]);
  useEffect(() => {
    selectedRef.current = selected;
    Object.entries(poseGroupsRef.current).forEach(([id, group]) => { group.visible = id === poses[selected].id; });
  }, [selected, poses]);

  useEffect(() => {
    const host = stageRef.current;
    if (!host) return;
    let cancelled = false;
    let frame = 0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND);
    const camera = new THREE.PerspectiveCamera(32, 1, 1, 5000);
    camera.up.set(0, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.prepend(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b4aa, 2.0));
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-250, -300, 500); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.9); fill.position.set(300, 200, 200); scene.add(fill);

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

    const loader = new STLLoader();
    const load = async (file: string, color: number) => {
      const response = await fetch(asset(`${DIR}/${file}.stl`));
      if (!response.ok) throw new Error("The model files could not be downloaded.");
      const geometry = loader.parse(await response.arrayBuffer());
      geometry.computeVertexNormals();
      const group = new THREE.Group();
      group.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, metalness: 0.1, roughness: 0.6 })));
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 30), new THREE.LineBasicMaterial({ color: 0x2b2f38, transparent: true, opacity: 0.25 })));
      return group;
    };

    Promise.all([
      Promise.all(FIXED.map((part) => load(part.file, part.color))),
      Promise.all(poses.map((pose) => Promise.all(POSED.map((part) => load(`${pose.id}-${part.file}`, part.color))))),
    ]).then(([fixed, posed]) => {
      if (cancelled) return;
      const model = new THREE.Group();
      fixed.forEach((group) => model.add(group));
      poses.forEach((pose, index) => {
        const group = new THREE.Group();
        posed[index].forEach((part) => group.add(part));
        group.visible = index === selectedRef.current;
        poseGroupsRef.current[pose.id] = group;
        model.add(group);
      });

      // Spin about the turret axis, centered on the model's height.
      const box = new THREE.Box3().setFromObject(model);
      model.position.z = -(box.min.z + box.max.z) / 2;
      const pivot = new THREE.Group();
      pivot.add(model);
      const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
      const distance = (radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * 0.72;
      camera.position.copy(new THREE.Vector3(0.75, 0.85, 0.5).normalize().multiplyScalar(distance));
      controls.target.set(0, 0, 0);
      controls.saveState();
      controls.update();
      pivotRef.current = pivot;
      scene.add(pivot);
      setStatus("Posed from the OpenSCAD source");
    }).catch((error: Error) => { if (!cancelled) setStatus(error.message); });

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (pivotRef.current && autoRotateRef.current) pivotRef.current.rotation.z += 0.003;
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
      pivotRef.current = null;
      poseGroupsRef.current = {};
      controlsRef.current = null;
    };
  }, [poses]);

  const resetView = () => {
    controlsRef.current?.reset();
    pivotRef.current?.rotation.set(0, 0, 0);
  };

  return (
    <div className="viewer">
      <div className="viewer-panel">
        <h3>{title}</h3>
        <p>{intro}</p>
        <div className="segmented" role="group" aria-label="Choose a pose">
          {poses.map((pose, index) => (
            <button type="button" aria-pressed={index === selected} key={pose.id} onClick={() => setSelected(index)}>{pose.label}</button>
          ))}
        </div>
        <p className="viewer-note">{poses[selected].note}</p>
        <div className="viewer-actions">
          <button type="button" onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? "Pause" : "Rotate"}</button>
          <button type="button" onClick={resetView}>Reset</button>
        </div>
        <p className="fine">Drag to rotate, scroll to zoom, right-drag to pan.</p>
      </div>
      <div className="viewer-stage" ref={stageRef}>
        <span className="viewer-status">{status}</span>
      </div>
    </div>
  );
}
