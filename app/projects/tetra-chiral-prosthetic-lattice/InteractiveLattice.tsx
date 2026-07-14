"use client";

import { useState } from "react";

const variants = [
  { id: "I", label: "Unit Cell I", scale: 1, note: "Baseline lattice geometry used to establish the first simulation and compression-test comparison." },
  { id: "II", label: "Unit Cell II", scale: .82, note: "A reduced-scale variation used to study how dimensional changes influence structural response." },
  { id: "III", label: "Unit Cell III", scale: .66, note: "A further geometric iteration selected for the final tessellated prosthetic concept." },
  { id: "ASTM", label: "ASTM control", scale: .94, note: "A solid cylindrical specimen used as the material-property and compression-test reference." },
];

const results = [
  { id: "displacement", label: "Displacement", image: "/projects/prosthetics/tetra-chiral-poster.png", copy: "Locate the displacement field and deformation comparison in the research summary." },
  { id: "strain", label: "Strain", image: "/projects/prosthetics/tetra-chiral-poster.png", copy: "Review the strain result alongside the study methodology and specimen geometry." },
  { id: "stress", label: "Stress", image: "/projects/prosthetics/tetra-chiral-poster.png", copy: "Connect the stress result to the applied compression setup and lattice topology." },
  { id: "response", label: "Response", image: "/projects/prosthetics/tetra-chiral-poster.png", copy: "Compare the reported simulation and experimental response plots in context." },
];

export default function InteractiveLattice() {
  const [selected, setSelected] = useState(2);
  const [compression, setCompression] = useState(0);
  const [result, setResult] = useState(0);
  const variant = variants[selected];
  const activeResult = results[result];

  return <>
    <section className="project-explorer" aria-labelledby="geometry-heading">
      <div className="explorer-copy">
        <p className="case-kicker">Interactive geometry study</p>
        <h2 id="geometry-heading">Compare the design iterations.</h2>
        <p>{variant.note}</p>
        <div className="variant-tabs" role="group" aria-label="Choose specimen geometry">
          {variants.map((item, index) => <button className={index === selected ? "active" : ""} key={item.id} onClick={() => setSelected(index)}>{item.label}</button>)}
        </div>
        <label className="load-control">Conceptual compression <span>{compression}%</span>
          <input type="range" min="0" max="100" value={compression} onChange={(event) => setCompression(Number(event.target.value))} />
        </label>
        <p className="model-disclaimer">Visual geometry explorer only — this control does not calculate engineering results.</p>
      </div>
      <div className="lattice-stage">
        <div className="load-arrow top">Applied displacement ↓</div>
        <div className={`specimen ${variant.id === "ASTM" ? "cylinder" : ""}`} style={{"--cell-scale": variant.scale, "--compression": compression / 100} as React.CSSProperties}>
          {variant.id !== "ASTM" && Array.from({length: 12}, (_, i) => <i key={i}><b /></i>)}
        </div>
        <div className="fixture-line" /><span className="fixture-label">Fixed lower plate</span>
        <div className="stage-readout"><span>SPECIMEN</span><strong>{variant.label}</strong><span>VIEW</span><strong>{compression ? "Compressed" : "Unloaded"}</strong></div>
      </div>
    </section>

    <section className="result-explorer" aria-labelledby="results-heading">
      <div className="result-heading"><div><p className="case-kicker">Nonlinear simulation</p><h2 id="results-heading">Inspect the evidence.</h2></div><p>The result viewer presents the original study exports without converting their color scales into unsupported performance claims.</p></div>
      <div className="result-tabs" role="tablist" aria-label="Simulation result type">
        {results.map((item, index) => <button role="tab" aria-selected={index === result} className={index === result ? "active" : ""} key={item.id} onClick={() => setResult(index)}>{item.label}</button>)}
      </div>
      <figure className="result-frame"><img src={activeResult.image} alt={`Research poster containing the ${activeResult.label.toLowerCase()} results and study context`} /><figcaption><strong>{activeResult.label}</strong>{activeResult.copy}</figcaption></figure>
    </section>
  </>;
}
