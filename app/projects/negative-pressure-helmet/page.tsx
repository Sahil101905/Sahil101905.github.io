import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import VerificationExplorer from "@/components/VerificationExplorer";
import { absolute, asset } from "@/lib/site";

const description = "A $68 negative-pressure helmet prototype for nebulizer treatment, traced from requirements to a Simulink model and bench verification.";

export const metadata: Metadata = {
  title: "Negative-pressure isolation helmet",
  description,
  openGraph: { title: "Negative-pressure isolation helmet · Sahil Khan", description, images: [absolute("/projects/negative-pressure-helmet/cover.jpg")] },
};

const bom = [
  ["Clear 5-gallon PET carboy", "$33.49"],
  ["Rechargeable suction fan", "$9.98"],
  ["HEPA + sponge filter set", "$16.99"],
  ["Shoulder foam", "$7.62"],
];

export default function NegativePressureHelmetProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · Medical device design · 2025"
        title="Negative-pressure isolation helmet"
        lede="Negative-pressure rooms contain airborne particles during nebulizer treatment, but they're fixed and expensive. We shrank the problem to the patient's head and built a filtered, negative-pressure enclosure for $68."
        facts={[
          { label: "My role", value: "Component integration, verification, build" },
          { label: "System model", value: "Simulink control volume" },
          { label: "Prototype cost", value: "$68.08 of an $80 budget" },
          { label: "Team", value: "S. Khan, M. Muhlig, R. Tabor, R. Benamara" },
        ]}
      />

      <CaseSection id="need" label="01 · The need" title="Local containment instead of a whole room">
        <p>
          Nebulizers turn medication into an inhalable aerosol, and exhaled droplets and fine particles can stay
          airborne. Hospital negative-pressure rooms handle that risk, but they aren&apos;t practical for every
          long-term-care or home setting.
        </p>
        <p>
          We reframed the room-scale problem around the patient&apos;s head: keep leakage flowing inward, preserve
          visibility and comfort, and route exhaust through a filter, using parts we could assemble within a
          ten-week course and an $80 budget.
        </p>
      </CaseSection>

      <CaseSection id="model" label="02 · Model" title="A control-volume model in Simulink" wide>
        <div className="split">
          <Figure src={asset("/projects/negative-pressure-helmet/simulink-model.png")} alt="Simulink model with breathing and nebulizer inputs, helmet volume, resistance, compliance, pressure and air-change outputs" caption="The team's Simulink control-volume model." />
          <div>
            <p>
              The model treats the helmet as a dynamic volume. Nebulizer input, breathing, filtered exhaust, leakage,
              compliance and resistance combine to predict helmet pressure, available volume and air changes per
              hour, the values we used to set design requirements.
            </p>
            <ol className="steps compact">
              <li><strong>Inputs.</strong> Time-varying breathing and nebulizer flow.</li>
              <li><strong>Dynamics.</strong> Compliance and leakage resistance turn net flow into pressure.</li>
              <li><strong>Exhaust.</strong> Fan and HEPA flow sized to hold negative pressure.</li>
              <li><strong>Outputs.</strong> Pressure (Pa), volume (L) and air changes per hour.</li>
            </ol>
          </div>
        </div>
      </CaseSection>

      <CaseSection id="build" label="03 · Build" title="Off-the-shelf parts, testable airflow" wide>
        <div className="split">
          <Figure src={asset("/projects/negative-pressure-helmet/prototype.webp")} alt="Completed negative-pressure helmet prototype" caption="As-built prototype." className="tall" />
          <div>
            <p>
              The build paired a clear PET carboy with a compact suction fan, HEPA media, shoulder padding and a
              flexible neck seal. The shape kept the airflow path visible and easy to instrument on the bench.
            </p>
            <table className="bom">
              <caption>Bill of materials</caption>
              <tbody>
                {bom.map(([item, cost]) => <tr key={item}><td>{item}</td><td>{cost}</td></tr>)}
              </tbody>
              <tfoot><tr><td>Total</td><td>$68.08</td></tr></tfoot>
            </table>
          </div>
        </div>
      </CaseSection>

      <CaseSection id="verification" label="04 · Verification" title="Six requirements, six bench tests" wide>
        <p className="section-intro">Pick a requirement to see the measured result, the threshold, the repeated trials and how confident the team was in the evidence.</p>
        <VerificationExplorer />
        <p className="fine">Course prototype and bench data only. This was not a clinical study and the device is not approved medical equipment.</p>
      </CaseSection>

      <CaseSection id="learning" label="05 · What I learned" title="It passed, and it showed us the next design">
        <p>
          My work centered on component integration, standards-based verification methods, final construction and
          repeated testing. The strongest result was traceability: every design input had a physical measurement and
          a documented pass criterion.
        </p>
        <dl className="spec-list">
          <div><dt>Worked</dt><dd>Pressure and flow followed the expected negative-pressure response, so we could compare the model with measurements.</dd></div>
          <div><dt>Weak</dt><dd>Only three of five exhaust-flow trials cleared the threshold. The average passed, but more trials and a better fixture would make the claim stronger.</dd></div>
          <div><dt>Next</dt><dd>Add an internal headrest, replace temporary neck-seal joints, measure fan noise, and test with a breathing subject and nebulizer running together.</dd></div>
        </dl>
      </CaseSection>
    </CaseStudyPage>
  );
}
