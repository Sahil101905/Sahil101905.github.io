import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import ImageTabs from "@/components/ImageTabs";
import StepViewer from "@/components/StepViewer";
import { absolute, asset } from "@/lib/site";

const description = "Design, nonlinear FEA, fabrication and compression testing of tetra-chiral lattices for a lightweight prosthetic leg.";

export const metadata: Metadata = {
  title: "Tetra-chiral prosthetic lattice",
  description,
  openGraph: { title: "Tetra-chiral prosthetic lattice · Sahil Khan", description, images: [absolute("/projects/tetra-chiral/cover.png")] },
};

const models = [
  { id: "I", label: "Unit cell I", file: "/models/tetra-chiral/unit-cell-1.step", note: "The baseline full-scale unit cell exported from SolidWorks." },
  { id: "II", label: "Unit cell II", file: "/models/tetra-chiral/unit-cell-2.step", note: "The second iteration, used for the scaled comparison study." },
  { id: "III", label: "Unit cell III", file: "/models/tetra-chiral/unit-cell-3.step", note: "The reduced-thickness geometry used in the final nonlinear simulation." },
  { id: "ASTM", label: "ASTM control", file: "/models/tetra-chiral/astm-cylinder.step", note: "The cylindrical control specimen used to characterize the printed material." },
];

const results = [
  { id: "displacement", label: "Displacement", image: "/projects/tetra-chiral/displacement.jpg", alt: "Displacement plot for Unit Cell III", caption: "Displacement field, Unit Cell III nonlinear study." },
  { id: "strain", label: "Strain", image: "/projects/tetra-chiral/strain.jpg", alt: "Strain plot for Unit Cell III", caption: "Strain distribution, Unit Cell III nonlinear study." },
  { id: "stress", label: "Stress", image: "/projects/tetra-chiral/stress.jpg", alt: "Stress plot for Unit Cell III", caption: "Stress distribution, Unit Cell III nonlinear study." },
  { id: "response", label: "Load response", image: "/projects/tetra-chiral/response.jpg", alt: "Nonlinear stress versus displacement response", caption: "Stress versus displacement at the loaded node." },
];

export default function TetraChiralProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · Zheng Research Lab · 2024 – 2025"
        title="Tetra-chiral prosthetic lattice"
        lede="Can geometry redistribute load in a prosthetic leg without adding mass? I designed three chiral unit cells, simulated them, printed them, and compression-tested them to see where the model held up."
        facts={[
          { label: "My role", value: "CAD, FEA, fabrication, testing" },
          { label: "Methods", value: "Nonlinear FEA, compression testing" },
          { label: "Tools", value: "SolidWorks, additive manufacturing" },
          { label: "Output", value: "3 lattice variants + ASTM control" },
        ]}
      />

      <CaseSection id="question" label="01 · The question" title="Lightweight, flexible and strong at once">
        <p>
          Tetra-chiral structures connect a central ring to its neighbors with curved ligaments. Under compression
          that topology rotates as it deforms, which can absorb shock while keeping stiffness. The study asked whether
          that behavior could balance shock absorption, flexibility and strength in a prosthetic leg concept.
        </p>
        <p>
          Simulation alone can&apos;t capture print defects or fixture effects, and physical tests alone can&apos;t
          show internal stress and strain. So the study used both and compared them.
        </p>
      </CaseSection>

      <CaseSection id="cad" label="02 · Geometry" title="Three design iterations" wide>
        <StepViewer
          models={models}
          initial={2}
          deflection={0.001}
          title="Original CAD"
          intro="Each model below is parsed in your browser straight from the SolidWorks STEP export."
        />
      </CaseSection>

      <CaseSection id="simulation" label="03 · Simulation" title="Nonlinear FEA of the final cell" wide>
        <ImageTabs tabs={results} label="Simulation result" />
      </CaseSection>

      <CaseSection id="workflow" label="04 · Workflow" title="Design, simulate, fabricate, test">
        <ol className="steps">
          <li><strong>Design.</strong> Built an ideal unit cell, then scaled variants and tessellated concepts.</li>
          <li><strong>Simulate.</strong> Ran nonlinear compression studies for displacement, strain, stress and load response.</li>
          <li><strong>Fabricate.</strong> 3D-printed lattice specimens and an ASTM-style cylindrical control.</li>
          <li><strong>Test.</strong> Compared compression behavior across simulated and physical specimens.</li>
        </ol>
        <Figure src={asset("/projects/prosthetics/tetra-chiral-poster.png")} alt="Research poster summarizing the tetra-chiral lattice study" caption="Research poster summarizing the study." className="poster" />
      </CaseSection>

      <CaseSection id="verification" label="05 · What I learned" title="Where the model matched, and where it couldn't">
        <p>
          Treating the simulation as a hypothesis made its gaps useful. Differences between predicted and measured
          behavior trace back to idealized material properties, contact assumptions, mesh resolution, fixture
          alignment, print variation and boundary conditions.
        </p>
        <p>
          Comparing mechanical properties and dimensional variations, followed by failure-mode analysis, identified
          2×2×10 tessellations as the best configuration for load distribution and force-to-displacement efficiency.
        </p>
        <p>The gaps between model and test define what to calibrate, retest and redesign next.</p>
      </CaseSection>
    </CaseStudyPage>
  );
}
