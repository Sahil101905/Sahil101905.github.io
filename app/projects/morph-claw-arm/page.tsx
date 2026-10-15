import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import ArmViewer from "@/components/ArmViewer";
import ImageTabs from "@/components/ImageTabs";
import { absolute, asset } from "@/lib/site";

const description = "A 3D-printed desktop arm with a gear-driven three-finger claw, designed around a fixed parts bin for MORPH, a team robot demoed at OwlHacks 2026.";

export const metadata: Metadata = {
  title: "Three-finger claw arm for MORPH",
  description,
  openGraph: { title: "Three-finger claw arm · Sahil Khan", description, images: [absolute("/projects/morph-claw-arm/card-grab.jpg")] },
};

const poses = [
  { id: "point", label: "Point", note: "Claw closed into a single pointer and aimed at a target. This is how MORPH shows the user what it understood." },
  { id: "home", label: "Home", note: "Both servos at center, fingers half open. The rest position at power-on." },
  { id: "grab", label: "Grab", note: "Fingers open and the claw reaching down past the front of the robot to pick up a light object." },
];

const clawTabs = [
  { id: "closed", label: "Closed", image: "/projects/morph-claw-arm/claw-closed.jpg", alt: "Three-finger claw with the fingers closed together", caption: "Closed at 45°. The three fingertips meet on the claw axis and form the pointer." },
  { id: "open", label: "Open", image: "/projects/morph-claw-arm/claw-open.jpg", alt: "Three-finger claw with the fingers spread open around the center gear", caption: "Open at 150°. The center gear on the servo spline drives all three sector gears at once." },
];

export default function MorphClawArmProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · OwlHacks 2026 · HCI track"
        title="Three-finger claw arm for MORPH"
        lede="MORPH is a small robot that acts as an interface for your computer: you point at something, and it points back to show what it understood. I designed the arm that does the pointing, with a three-finger claw that closes into a pointer and opens to pick things up."
        facts={[
          { label: "My role", value: "Arm and claw design, arm firmware" },
          { label: "Actuators", value: "2× SG90, 9 g servo, 28BYJ-48 stepper" },
          { label: "Build", value: "19 PLA parts, one P1S plate" },
          { label: "Result", value: "Demoed to MLH and the judges" },
        ]}
      />

      <CaseSection id="model" label="01 · The arm" title="Three poses, one set of parts" wide>
        <ArmViewer
          poses={poses}
          title="Assembly"
          intro="The full assembly, posed in the parametric OpenSCAD model. Printed parts are shown in off-white, the claw gears in blue."
        />
      </CaseSection>

      <CaseSection id="team" label="02 · Who did what" title="My part of a team project">
        <p>
          MORPH was a team build at OwlHacks 2026. My teammates wrote the Raspberry Pi vision code that works out
          where you are pointing, the laptop agent that turns knob turns and button presses into volume, slide and
          mouse actions, the voice layer, and the Arduino Nano controller code. That work is in the
          team&apos;s <a href="https://github.com/muhammadrashid4587/morph">morph repository</a>.
        </p>
        <p>
          I owned the arm: the mechanical design, the three-finger claw, the print files, and the ESP32 firmware that
          takes the team&apos;s pose commands and moves the joints. The arm was wired into the robot, and we demoed
          MORPH to the MLH representatives and the judges.
        </p>
      </CaseSection>

      <CaseSection id="constraints" label="03 · Constraints" title="Designed around the parts bin">
        <p>
          I started from the open-source MeArm, a four-servo desk arm with a two-jaw gripper. A two-jaw gripper only
          grips well in one direction, so I wanted three fingers, 120° apart, that close on the center together.
        </p>
        <p>
          The parts bin set everything else. Only three of my servos could hold an angle: two SG90s and one 9 g
          DGServo. The fourth was a continuous-rotation FS90R, which can be set to a speed but not an angle. I also
          had two 28BYJ-48 geared steppers, eight M3 nylock nuts and a Bambu Lab P1S. MeArm is designed to be laser-cut
          from acrylic, so I redrew the arm for printing.
        </p>
        <dl className="spec-list">
          <div><dt>Base</dt><dd>28BYJ-48 stepper. Turning the turret takes little torque, and using the stepper here leaves the servos for the arm.</dd></div>
          <div><dt>Shoulder</dt><dd>SG90. This joint carries the most load, and an SG90 (about 1.8 kg·cm) is stronger than the stepper.</dd></div>
          <div><dt>Elbow</dt><dd>SG90 on the turret, driving the forearm through a parallelogram rod.</dd></div>
          <div><dt>Claw</dt><dd>The 9 g DGServo, driving all three fingers through one gear train.</dd></div>
        </dl>
      </CaseSection>

      <CaseSection id="linkage" label="04 · Linkage" title="No wrist servo needed">
        <p>
          I switched from the MeArm layout to an EEZYbotARM-style parallelogram. Both arm servos sit on the turret, so
          the moving links carry no motors. The elbow servo sets the forearm&apos;s absolute angle, and the claw is
          fixed to the forearm, so the elbow servo also sets where the claw points. Pointing needs no wrist servo,
          which mattered because there wasn&apos;t one to spare.
        </p>
        <p>
          The links are short (80 mm upper arm, 60 mm forearm) so the SG90s can carry the heavier three-finger
          claw. Reach is 80 to 160 mm from the turret axis, and payload is about 20 g at full reach, which is enough
          for the foam blocks and printed tokens in the demo.
        </p>
        <Figure src={asset("/projects/morph-claw-arm/arm-grab.jpg")} alt="Arm assembly reaching forward and down with the claw open" caption="Grab pose: the claw reaches below deck level to pick up objects on the table in front of the robot." />
      </CaseSection>

      <CaseSection id="claw" label="05 · Claw" title="One servo, three fingers">
        <p>
          A center gear presses straight onto the claw servo&apos;s spline and meshes with three sector gears, one
          at the root of each finger. The fingers pivot on M3 screws spaced 120° apart, so one servo opens and closes
          all three together. The gearing is about 1.4:1, trading finger speed for grip from a weak 9 g servo.
        </p>
        <p>
          Before printing the full plate, I printed the center gear with three bore sizes (4.8, 4.9 and 5.0 mm) to
          find the press fit on the servo spline.
        </p>
        <ImageTabs tabs={clawTabs} label="Claw position" />
      </CaseSection>

      <CaseSection id="build" label="06 · Build" title="Checked in CAD, printed in one go">
        <p>
          The whole arm is one parametric OpenSCAD file. A collision sweep over the working range (shoulder −25° to
          135°, forearm −90° to 30°) checks every pair of links, screws, servos and the turret against each other, and
          a second check confirms the fingers stay in mesh from fully closed to fully open.
        </p>
        <p>
          All 19 parts print on one P1S plate without supports. The finger pivots and wrist screws thread straight into
          undersized holes in the plastic, which left the nylocks for the arm&apos;s moving pins: the build uses five of the eight.
        </p>
        <Figure src={asset("/projects/morph-claw-arm/print-plate.jpg")} alt="All printed arm parts laid out on one build plate" caption="The print plate: base, turret, links, claw plate, center gear, three fingers and spacers." />
      </CaseSection>

      <CaseSection id="firmware" label="07 · Firmware" title="Poses that are checked before the arm moves">
        <p>
          The ESP32 receives newline-delimited JSON over USB serial from the team&apos;s Raspberry Pi, using the same
          pose names as the rest of MORPH: <code>home</code>, <code>point</code>, <code>grab</code>, <code>nod</code> and
          a few others. It can also aim the claw at a target given in millimeters, using inverse kinematics.
        </p>
        <ol className="steps">
          <li><strong>Check.</strong> Every requested pose is tested against the same collision model as the CAD sweep: turret, floor and the robot&apos;s deck.</li>
          <li><strong>Check the path.</strong> Twelve points along the move are tested too, because a move between two safe poses can still pass through an unsafe one.</li>
          <li><strong>Move.</strong> Servos follow an eased trajectory and the stepper runs with acceleration limits. Unsafe requests are rejected with a reason instead of being clipped.</li>
          <li><strong>Calibrate.</strong> Servo direction, offsets and deck size are set over serial and stored in flash, so a rebuilt arm doesn&apos;t need new firmware.</li>
        </ol>
      </CaseSection>
    </CaseStudyPage>
  );
}
