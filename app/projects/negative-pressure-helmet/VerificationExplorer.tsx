"use client";

import { useState } from "react";

const tests = [
  {
    id: "pressure",
    number: "01",
    label: "Helmet pressure",
    result: "-29.6 Pa",
    requirement: "Negative pressure maintained",
    trials: "5 / 5 pass",
    confidence: "4 / 5",
    note:
      "Five manometer trials ranged from -41 to -19 Pa. The team also compared the measured response with the model under breathing and nebulizer inputs.",
    bars: [98, 100, 46, 61, 56],
  },
  {
    id: "ach",
    number: "02",
    label: "Air changes",
    result: "2,869 ACH",
    requirement: "≥ 12 ACH",
    trials: "5 / 5 pass",
    confidence: "4 / 5",
    note:
      "Airflow and measured internal volume were combined to calculate air changes per hour. The compact enclosure produced a result far above the room-scale reference.",
    bars: [93, 100, 99, 94, 99],
  },
  {
    id: "flow",
    number: "03",
    label: "Filtered exhaust",
    result: "11.724 L/s",
    requirement: "≥ 11.5 L/s average",
    trials: "3 / 5 above target",
    confidence: "3 / 5",
    note:
      "The average of five anemometer trials cleared the design threshold, although two individual trials fell short. The team marked this as the lowest-confidence pass.",
    bars: [84, 89, 100, 91, 100],
  },
  {
    id: "volume",
    number: "04",
    label: "Available air volume",
    result: "14.7 L",
    requirement: "≥ 13.8 L",
    trials: "5 / 5 pass",
    confidence: "3.5 / 5",
    note:
      "A packing-peanut displacement method compared full and occupied volumes using a mannequin head, then averaged five repeated measurements.",
    bars: [90, 100, 96, 96, 90],
  },
  {
    id: "weight",
    number: "05",
    label: "Weight & size",
    result: "0.922 kg",
    requirement: "≤ 1.5 kg",
    trials: "3 / 3 pass",
    confidence: "5 / 5",
    note:
      "Repeated weigh-ins were stable, and the assembled envelope measured approximately 27.94 × 27.9 × 45.72 cm.",
    bars: [99, 100, 99],
  },
  {
    id: "visibility",
    number: "06",
    label: "Visibility",
    result: "100%",
    requirement: "≥ 98% accuracy",
    trials: "5 / 5 pass",
    confidence: "5 / 5",
    note:
      "A camera viewed a LogMAR chart through the transparent shell from 40 cm. All five trials captured the required line with full reading accuracy.",
    bars: [100, 100, 100, 100, 100],
  },
];

export default function VerificationExplorer() {
  const [activeId, setActiveId] = useState(tests[0].id);
  const active = tests.find((test) => test.id === activeId) ?? tests[0];

  return (
    <section className="helmet-verification" id="verification">
      <div className="helmet-section-heading">
        <p>04 / Bench verification</p>
        <div>
          <h2>Six requirements, each tied to a measurable test.</h2>
          <p>
            Select a requirement to inspect the result, threshold, repeated
            trials, and the team&apos;s stated confidence in the evidence.
          </p>
        </div>
      </div>

      <div className="verification-shell">
        <div className="verification-tabs" role="tablist" aria-label="Verification results">
          {tests.map((test) => (
            <button
              type="button"
              role="tab"
              aria-selected={test.id === active.id}
              className={test.id === active.id ? "active" : ""}
              onClick={() => setActiveId(test.id)}
              key={test.id}
            >
              <span>{test.number}</span>
              {test.label}
            </button>
          ))}
        </div>

        <div className="verification-detail" role="tabpanel">
          <div className="verification-result">
            <p>Measured result</p>
            <strong>{active.result}</strong>
            <span>{active.label}</span>
          </div>
          <div className="verification-copy">
            <div className="verification-meta">
              <div><span>Design threshold</span><strong>{active.requirement}</strong></div>
              <div><span>Repeated trials</span><strong>{active.trials}</strong></div>
              <div><span>Team confidence</span><strong>{active.confidence}</strong></div>
            </div>
            <p>{active.note}</p>
            <div className="trial-bars" aria-label={`Relative trial results for ${active.label}`}>
              {active.bars.map((value, index) => (
                <div key={`${active.id}-${index}`}>
                  <i style={{ height: `${Math.max(12, value)}%` }} />
                  <span>T{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="helmet-disclaimer">
        Course prototype and bench data only. This project was not a clinical
        study and the device is not presented as approved medical equipment.
      </p>
    </section>
  );
}
