import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import StepViewer from "@/components/StepViewer";
import { absolute, asset } from "@/lib/site";

const description = "A low-cost, modular upper-limb prosthetic combining a 3D-printed linkage, embedded actuation and EMG intent prediction.";

export const metadata: Metadata = {
  title: "Modular prosthetic hand with EMG control",
  description,
  openGraph: { title: "Modular prosthetic hand · Sahil Khan", description, images: [absolute("/projects/emg-prosthetic/cover.png")] },
};

const models = [
  { id: "linkage", label: "Finger linkage", file: "/models/emg-prosthetic/finger-linkage-assembly.step", note: "The six-body finger mechanism: knuckle, phalanx links and connecting members.", rotation: [-0.18, -0.35, 0.06] as const },
  { id: "prototype", label: "Full prototype", file: "/models/emg-prosthetic/complete-prototype.step", note: "The complete mechanism from the one-piece-baseplate prototype.", rotation: [-0.2, -0.42, 0.04] as const },
  { id: "forearm", label: "Forearm", file: "/models/emg-prosthetic/forearm-assembly.step", note: "The forearm enclosure and how it packages the internal mechanism.", rotation: [-0.16, -0.4, 0.02] as const },
  { id: "actuator", label: "Actuator", file: "/models/emg-prosthetic/actuonix-l16-actuator.step", note: "The Actuonix L16 linear actuator, used to study packaging and stroke.", rotation: [-0.12, -0.45, 0.02] as const },
];

export default function EmgProstheticProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · Drexel IEEE"
        title="Modular prosthetic hand with EMG control"
        lede="Advanced prosthetic arms cost $10,000 to $50,000. Our team built a repairable, 3D-printed alternative that reads muscle signals from the opposite limb to predict what the user wants to do."
        facts={[
          { label: "My role", value: "System architecture, EMG software" },
          { label: "Mechanical", value: "Modular 3D-printed linkage" },
          { label: "Embedded", value: "Raspberry Pi Zero 2 W, ATmega32U4" },
          { label: "Team", value: "6 engineers" },
        ]}
      />

      <CaseSection id="challenge" label="01 · The problem" title="Capable, repairable and affordable">
        <p>
          Commercial upper-limb prostheses are expensive and hard to customize. We designed around 3D-printed parts,
          serviceable joints and swappable end effectors so the hand could be repaired and adapted cheaply.
        </p>
        <p>
          The mechanism and the EMG interface were developed as one product. The linkage had to deliver useful
          motion, and the control pipeline had to turn noisy muscle signals into reliable intent quickly enough to
          feel responsive.
        </p>
      </CaseSection>

      <CaseSection id="cad" label="02 · Mechanism" title="From finger linkage to full assembly" wide>
        <StepViewer
          models={models}
          title="Original CAD"
          intro="Each assembly is parsed in your browser from the team's SolidWorks STEP exports. This is a geometry viewer, not a kinematic simulation."
        />
      </CaseSection>

      <CaseSection id="system" label="03 · System" title="Mechanics, electronics and software in one loop">
        <dl className="spec-list">
          <div><dt>Mechanical</dt><dd>3D-printed members with steel bearings at the pivots, a swappable attachment interface and linear actuation.</dd></div>
          <div><dt>Embedded</dt><dd>A Raspberry Pi Zero 2 W runs high-level logic and data handling; an ATmega32U4 handles actuator control and position feedback.</dd></div>
          <div><dt>Sensing</dt><dd>MyoWare 2.0 sensors capture EMG from the opposite limb for filtering and intent inference.</dd></div>
        </dl>
      </CaseSection>

      <CaseSection id="signal" label="04 · Signal path" title="From muscle activation to motion">
        <ol className="steps">
          <li><strong>Acquire.</strong> Record raw EMG and establish a maximum-voluntary-contraction baseline.</li>
          <li><strong>Condition.</strong> Filter and normalize the signal so intent can be compared across trials.</li>
          <li><strong>Infer.</strong> Map multi-channel activity to motion commands with the learned intent model.</li>
          <li><strong>Actuate.</strong> Send commands to the motor controller and linkage in real time.</li>
        </ol>
        <p className="fine">Unpublished model details are intentionally left out.</p>
      </CaseSection>

      <CaseSection id="next" label="05 · Next steps" title="Prove it under repeated, real use">
        <p>
          Next comes larger-scale user testing, repeated-load durability testing, and refining the intent model for
          users whose residual signals change over time. We also identified hybrid control, which combines EMG with
          additional sensing, as a way to make activation more reliable.
        </p>
        <Figure src={asset("/projects/prosthetics/emg-prosthetic-poster.png")} alt="Engineering showcase poster for the modular prosthetic" caption="Engineering showcase poster." className="poster" />
      </CaseSection>
    </CaseStudyPage>
  );
}
