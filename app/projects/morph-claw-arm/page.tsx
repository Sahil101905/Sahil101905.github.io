import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import { absolute, asset } from "@/lib/site";

const description = "A small 3D-printed robot arm with a three-finger gear-driven claw, built from leftover hobby parts for MORPH, a team hackathon robot.";

export const metadata: Metadata = {
  title: "Three-finger claw arm for MORPH",
  description,
  openGraph: { title: "Three-finger claw arm · Sahil Khan", description, images: [absolute("/projects/morph-claw-arm/cover.jpg")] },
};

export default function MorphClawArmProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · OwlHacks HCI track · 2026"
        title="Three-finger claw arm for MORPH"
        lede="MORPH is a small robot that acts as an interface for your computer: you point at something, and it points back to show what it understood. I designed the arm that does the pointing, with a three-finger claw so it could also pick things up."
        facts={[
          { label: "My role", value: "Arm and claw design, arm firmware" },
          { label: "Hardware", value: "SG90 servos, 28BYJ-48 stepper, ESP32" },
          { label: "Fabrication", value: "PLA on a Bambu Lab P1S" },
          { label: "Team", value: "Hackathon team, shared repo" },
        ]}
      />

      <CaseSection id="team" label="01 · Who did what" title="My part of a team project">
        <p>
          MORPH was built by a team at OwlHacks. My teammates wrote the Raspberry Pi vision code that works out where
          you are pointing, the laptop agent that turns knob turns and button presses into volume, slide and mouse
          actions, the voice layer, and the Arduino Nano controller code. That work is in the
          team&apos;s <a href="https://github.com/muhammadrashid4587/morph">morph repository</a>.
        </p>
        <p>
          I owned the arm: the mechanical design, the three-finger claw, the print files, and the ESP32 firmware that
          takes the team&apos;s pose commands and moves the joints. Everything below is that part.
        </p>
      </CaseSection>

      <CaseSection id="constraints" label="02 · Constraints" title="A MeArm with a third finger, from the parts on hand">
        <p>
          I started from the open-source MeArm, a four-servo desk arm with a two-jaw gripper. A two-jaw gripper only
          holds objects well in one direction, so I wanted three fingers 120° apart that close on the center together.
        </p>
        <p>
          The parts bin set the rest. Only three of my servos could hold a position (two SG90s and one 9 g DGServo).
          The fourth was a continuous-rotation FS90R, which can be set to a speed but not an angle. I also had two
          28BYJ-48 geared steppers, eight M3 nylock nuts and a P1S printer. MeArm is designed to be laser-cut from
          acrylic, so every part had to be redrawn for printing.
        </p>
        <dl className="spec-list">
          <div><dt>Base</dt><dd>28BYJ-48 stepper. Turning the turret needs little torque, and using the stepper here frees a servo for the arm.</dd></div>
          <div><dt>Shoulder</dt><dd>SG90. This joint carries the most load, and an SG90 (about 1.8 kg·cm) is stronger than the stepper.</dd></div>
          <div><dt>Elbow</dt><dd>SG90, driving the forearm through the MeArm-style linkage so both servos ride on the turret.</dd></div>
          <div><dt>Claw</dt><dd>DGServo 9 g, driving all three fingers through one gear train.</dd></div>
        </dl>
      </CaseSection>

      <CaseSection id="claw" label="03 · Claw" title="One servo, three fingers">
        <p>
          A spur gear on the claw servo meshes with three sector gears, one at the root of each finger. The fingers
          pivot on M3 screws spaced 120° apart on a 22.5 mm radius, so one servo opens and closes all three at once.
          The gearing is about 1.4:1, which trades finger speed for grip from a weak 9 g servo. Each finger swings from
          45° (closed, which doubles as the pointing pose) to 150° (fully open).
        </p>
        <p>
          The three pivots use three of the eight nylocks. Fixed joints use 2.8 mm holes that the M3 screws thread
          into directly, which saved the remaining nylocks for the arm&apos;s moving joints. I printed a separate test
          of the drive gear to check its fit on the servo horn before committing to the full plate.
        </p>
        <Figure src={asset("/projects/morph-claw-arm/claw-parts.jpg")} alt="Drive gear and three sector-gear fingers laid flat for printing" caption="The drive gear (left) and the three fingers, each with its sector gear and grooved tip, as laid out on the print plate." />
      </CaseSection>

      <CaseSection id="arm" label="04 · Arm and base" title="Short links and a stepper turret">
        <p>
          I made the links shorter than a stock MeArm: 80 mm for the upper arm and 60 mm for the forearm, because the
          shoulder SG90 is already near its limit on a standard MeArm and the three-finger claw is heavier than the
          two-jaw one.
        </p>
        <p>
          The 28BYJ-48 has weak output bearings, so the turret rides on a printed ring and the stepper shaft only
          transmits rotation. A stepper doesn&apos;t know its position at power-on, so the turret has an arrow that is
          lined up with a mark on the base before startup, which sets zero without a limit switch. All parts print
          flat on one P1S plate without supports.
        </p>
        <Figure src={asset("/projects/morph-claw-arm/cover.jpg")} alt="All printed arm parts laid out on one build plate" caption="The full print plate: base housing, turret with servo cheeks and alignment arrow, arm links, claw parts and spacers." />
      </CaseSection>

      <CaseSection id="firmware" label="05 · Firmware" title="Poses that are checked before the arm moves">
        <p>
          The ESP32 receives newline-delimited JSON over USB serial from the team&apos;s Raspberry Pi, using the same
          pose names as the rest of MORPH: <code>home</code>, <code>point</code>, <code>grab</code>, <code>nod</code> and
          a few others. It can also aim the claw at a target given in millimeters, using inverse kinematics.
        </p>
        <ol className="steps">
          <li><strong>Check.</strong> Every requested pose is tested against a simple model of the turret, the floor and the robot&apos;s deck, taken from a collision sweep of the CAD.</li>
          <li><strong>Check the path.</strong> Twelve points along the move are tested too, because a move between two safe poses can still pass through an unsafe one.</li>
          <li><strong>Move.</strong> Servos follow an eased trajectory, and the stepper runs with acceleration limits. Unsafe requests are rejected with a reason instead of being clipped.</li>
          <li><strong>Calibrate.</strong> Servo direction, offsets and deck size can be set over serial and are stored in flash, so a rebuilt arm doesn&apos;t need new firmware.</li>
        </ol>
      </CaseSection>

      <CaseSection id="status" label="06 · Result" title="Built, wired and demoed">
        <p>
          The arm was printed, assembled and wired into MORPH during the hackathon. The team demoed the full robot to
          the MLH representatives and the judges at OwlHacks 2026.
        </p>
      </CaseSection>
    </CaseStudyPage>
  );
}
