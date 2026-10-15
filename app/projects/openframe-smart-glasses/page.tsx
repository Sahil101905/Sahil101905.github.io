import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import StepViewer from "@/components/StepViewer";
import { absolute, asset } from "@/lib/site";

const description = "Monocular smart glasses that show phone notifications through an OLED, a collimating lens and a small acrylic combiner, with the phone doing the heavy computing.";

export const metadata: Metadata = {
  title: "OpenFrame smart glasses",
  description,
  openGraph: { title: "OpenFrame smart glasses · Sahil Khan", description, images: [absolute("/projects/openframe/cover.jpg")] },
};

const models = [
  { id: "assembly", label: "Full assembly", file: "/models/openframe/assembly.step", note: "Front frame, both temples, the right optical pod and every bought part placed as a reference body.", rotation: [-Math.PI / 2, 0, 0] as const,
    source: "Original Onshape export",
    partColors: [
      { prefix: "PRINT", color: 0xd9dbe0 },
      { prefix: "REFERENCE - 53 mm", color: 0x9fb4d8 },
      { prefix: "REFERENCE - 25 x 20", color: 0x9fb4d8 },
      { prefix: "REFERENCE", color: 0x2f4a85 },
    ],
  },
];

export default function OpenFrameProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · Personal project · 2025 – now · in assembly"
        title="OpenFrame smart glasses"
        lede="OpenFrame is an attempt at a basic operating system for glasses: a small home screen of widgets in one eye, with the phone doing the computing. The first version does one thing, which is show your phone's notifications where you can read them without looking down."
        facts={[
          { label: "My role", value: "Everything: optics, CAD, firmware, apps" },
          { label: "Display", value: "0.96\" white OLED through a 45° combiner" },
          { label: "Software", value: "Unity simulator, SwiftUI iPhone host" },
          { label: "Status", value: "CAD done, parts bought, assembling" },
        ]}
      />

      <CaseSection id="idea" label="01 · The idea" title="Light glasses, heavy phone">
        <p>
          Most smart glasses try to fit a computer into the frame, which makes them heavy, hot and expensive. OpenFrame
          goes the other way. The glasses hold a display, two buttons, a small ESP32 and a battery. The paired
          iPhone decides what to show and sends it over.
        </p>
        <p>
          The longer goal is an SDK so other apps can draw widgets on the glasses. I started with notifications
          because they test every layer at once: the phone has to pick them up, the link has to carry them, and the
          optics have to make two lines of text readable at a relaxed focus.
        </p>
      </CaseSection>

      <CaseSection id="cad" label="02 · CAD" title="The full glasses in Onshape" wide>
        <StepViewer
          models={models}
          title="Onshape assembly"
          intro="The STEP export of the glasses, parsed in your browser. Printed parts and the bought parts they hold are modeled together so every clearance can be checked before printing."
        />
      </CaseSection>

      <CaseSection id="optics" label="03 · Optics" title="A monocular display from off-the-shelf parts">
        <p>
          The display sits in a pod outboard of the right lens, facing inward. A 34 mm biconvex lens one focal
          length (45 mm) away collimates the image so the eye can focus on it as if it were far away. A small two-way
          acrylic combiner at about 45°, just in front of the right lens, folds the image into the eye and lets the
          room show through behind it.
        </p>
        <Figure src={asset("/projects/openframe/optical-path.svg")} alt="Top-view diagram of the OLED, lens and combiner folding the image into the right eye" caption="Optical path, seen from above. The OLED draws a mirrored card so the reflection reads correctly." />
        <p>
          I chose a white SSD1306 OLED over the cheaper blue and the two-color yellow-and-blue panels. White text holds
          up better against a busy background, reflects more evenly off a neutral combiner, and the two-color panels
          fix each color to a band of the screen, which wastes half of a 64-pixel-tall display.
        </p>
        <p>
          The combiner only passes about 30% of room light, so it has to stay small and sit outside the center of
          your normal line of sight. The model uses a 25 × 20 × 1 mm piece. I&apos;ll prove alignment on a larger test
          piece cut from the same sheet first, then cut the final piece with rounded edges. It sits in a clip designed
          to break away from the face in an impact.
        </p>
      </CaseSection>

      <CaseSection id="hardware" label="04 · Hardware" title="A frame built to be changed">
        <p>
          The first frame is meant to be reprinted many times, so the optics live in a removable pod on the right
          side. The OLED rides on a focus sled, the lens is held by a printed retaining ring, and a cap closes the
          back of the pod. If a better micro-display comes along, only the pod changes. Every bought part is modeled
          in the assembly so clearances can be checked before anything is printed.
        </p>
        <dl className="spec-list">
          <div><dt>Right temple</dt><dd>A Seeed XIAO ESP32-S3 and two 6 mm buttons for next and dismiss.</dd></div>
          <div><dt>Left temple</dt><dd>A 500 mAh protected LiPo, a 5 V boost board and the power switch, to balance the weight of the pod.</dd></div>
          <div><dt>Power</dt><dd>A slide switch on the boost board&apos;s enable pin. The cell comes out to charge on a separate 100 mA charger, never in the frame.</dd></div>
          <div><dt>Lenses</dt><dd>Precut 53 mm replacement lenses for a Wayfarer-style frame, so the front reads as ordinary glasses.</dd></div>
        </dl>
        <p>
          Every part comes from a listing anyone can buy, and the full wearable comes to $93.68 before tax and
          shipping. The display and optics alone are $39.83, which is enough to prove the image on a bench. A custom
          PCB, camera and IMU are left out of the first build on purpose. All the parts are bought, and I&apos;m
          assembling the first prototype now.
        </p>
      </CaseSection>

      <CaseSection id="simulator" label="05 · Simulator" title="Testing the interface before the optics">
        <p>
          Optics are slow to iterate, so I built a smart-glasses simulator in Unity to work out the interface first.
          It puts you in a first-person scene with a 70° camera and floats a notification card in front of you. You
          press N to bring up the next notification and D to dismiss it, the same two actions as the buttons on the
          frame.
        </p>
        <p>
          The cards are read from the same JSON format the phone uses. That lets me check card size, text length and
          placement against a real scene before committing to a layout on a 128 × 64 display.
        </p>
      </CaseSection>

      <CaseSection id="phone" label="06 · Phone" title="The iPhone host">
        <p>
          The phone side is a SwiftUI app that will own the connection to the glasses. Right now it is the shell:
          connection status for the simulator and the glasses, a start and stop control for a session, and a list of
          notifications decoded from bundled JSON, with unit tests on the decoding.
        </p>
        <p>
          One notification format is shared across the phone, the simulator and the glasses: an id, the source app,
          a title, a body, a timestamp, a priority and a category. Unknown priorities fall back to normal instead of
          failing, so a newer phone app can&apos;t break older glasses firmware.
        </p>
      </CaseSection>

      <CaseSection id="next" label="07 · Next" title="What comes next">
        <ol className="steps">
          <li><strong>Bench optics.</strong> Find the lens distance and combiner angle that give a sharp image at a relaxed focus, and record them.</li>
          <li><strong>Print and fit.</strong> Print the optical pod and frame from the assembly, and check the fit without electronics.</li>
          <li><strong>Live link.</strong> Replace the mock data with real iPhone notifications sent to the ESP32 over Bluetooth Low Energy.</li>
          <li><strong>Wear test.</strong> Measure current draw and temperature on the bench before wearing it for any length of time.</li>
        </ol>
      </CaseSection>
    </CaseStudyPage>
  );
}
