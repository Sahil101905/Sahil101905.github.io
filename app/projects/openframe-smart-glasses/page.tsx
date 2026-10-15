import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import { absolute, asset } from "@/lib/site";

const description = "Monocular smart glasses that show phone notifications through an OLED, a collimating lens and a small acrylic combiner, with the phone doing the heavy computing.";

export const metadata: Metadata = {
  title: "OpenFrame smart glasses",
  description,
  openGraph: { title: "OpenFrame smart glasses · Sahil Khan", description, images: [absolute("/projects/openframe/optical-path.png")] },
};

export default function OpenFrameProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · Personal project · 2025 – now"
        title="OpenFrame smart glasses"
        lede="OpenFrame is an attempt at a basic operating system for glasses: a small home screen of widgets in one eye, with the phone doing the computing. The first version does one thing, which is show your phone's notifications where you can read them without looking down."
        facts={[
          { label: "My role", value: "Everything: optics, CAD, firmware, apps" },
          { label: "Display", value: "0.96\" white OLED through a 45° combiner" },
          { label: "Software", value: "Unity simulator, SwiftUI iPhone host" },
          { label: "Prototype parts", value: "$93.68" },
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

      <CaseSection id="optics" label="02 · Optics" title="A monocular display from off-the-shelf parts">
        <p>
          The display sits in the right temple, pointing down. A 34 mm biconvex lens about one focal length (45 mm)
          above it collimates the image so the eye can focus on it as if it were far away. A small two-way acrylic
          mirror at about 45° folds the image into the eye and lets the room show through behind it.
        </p>
        <Figure src={asset("/projects/openframe/optical-path.svg")} alt="Side-view diagram of the OLED, lens and combiner folding the image into the right eye" caption="Optical path. The OLED draws a mirrored card so the reflection reads correctly." />
        <p>
          I chose a white SSD1306 OLED over the cheaper blue and the two-color yellow-and-blue panels. White text holds
          up better against a busy background, reflects more evenly off a neutral combiner, and the two-color panels
          fix each color to a band of the screen, which wastes half of a 64-pixel-tall display.
        </p>
        <p>
          The combiner only passes about 30% of room light, so it has to stay small and sit outside the center of
          your normal line of sight. The plan is to prove alignment on a 40 × 50 mm test piece first, then cut a final
          piece of around 20 × 25 mm with rounded edges, on a mount that breaks away from the face in an impact.
        </p>
      </CaseSection>

      <CaseSection id="hardware" label="03 · Hardware" title="A frame built to be changed">
        <p>
          The first frame is meant to be reprinted many times, so the optics live in a removable pod on the right
          side. The OLED and lens ride on a carriage with at least ±5 mm of focus travel, and the combiner holder has
          several angle and height positions. If a better micro-display comes along, only the pod changes.
        </p>
        <dl className="spec-list">
          <div><dt>Right temple</dt><dd>ESP32 and the optical pod, with two tactile buttons for next and dismiss.</dd></div>
          <div><dt>Left temple</dt><dd>A 500 mAh protected LiPo and a 5 V boost board, to balance the weight of the pod.</dd></div>
          <div><dt>Power</dt><dd>A slide switch on the boost board&apos;s enable pin. The cell comes out to charge on a separate 100 mA charger, never in the frame.</dd></div>
          <div><dt>Lenses</dt><dd>Precut 53 mm replacement lenses for a Wayfarer-style frame, so the front reads as ordinary glasses.</dd></div>
        </dl>
        <p>
          I specified every part from listings I could actually buy, and the full wearable comes to $93.68 before tax
          and shipping. The display and optics alone are $39.83, which is all you need to prove the image on a bench.
          A custom PCB, camera and IMU are left out of the first build on purpose.
        </p>
      </CaseSection>

      <CaseSection id="simulator" label="04 · Simulator" title="Testing the interface before the optics">
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

      <CaseSection id="phone" label="05 · Phone" title="The iPhone host">
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

      <CaseSection id="next" label="06 · Next" title="What comes next">
        <ol className="steps">
          <li><strong>Bench optics.</strong> Find the lens distance and combiner angle that give a sharp image at a relaxed focus, and record them.</li>
          <li><strong>Pod and frame.</strong> Print the removable optical pod, then a fit-check frame without electronics.</li>
          <li><strong>Live link.</strong> Replace the mock data with real iPhone notifications sent to the ESP32 over Bluetooth Low Energy.</li>
          <li><strong>Wear test.</strong> Measure current draw and temperature on the bench before wearing it for any length of time.</li>
        </ol>
      </CaseSection>
    </CaseStudyPage>
  );
}
