import type { Metadata } from "next";
import { CaseHero, CaseSection, CaseStudyPage, Figure } from "@/components/CaseStudy";
import { absolute, asset } from "@/lib/site";

const description = "A wrist wearable that streams synchronized PPG and motion data over Bluetooth Low Energy and reports heart rate only when the signal can be trusted.";

export const metadata: Metadata = {
  title: "Wearable physiological monitor",
  description,
  openGraph: { title: "Wearable physiological monitor · Sahil Khan", description, images: [absolute("/projects/wearable-physio-monitor/synthetic-replay.png")] },
};

export default function WearablePhysioMonitorProject() {
  return (
    <CaseStudyPage>
      <CaseHero
        kicker="Case study · Personal project · 2026 – now · in assembly"
        title="Wearable physiological monitor"
        lede="Wrist heart-rate sensors work well when you sit still and badly when you move. I'm building a research wearable that records pulse and motion together, so it can tell when its own reading is unreliable and say so instead of showing a confident wrong number."
        facts={[
          { label: "My role", value: "Hardware, firmware, protocol, analysis" },
          { label: "Sensors", value: "MAX30102 PPG, BMI270 IMU, TMP117" },
          { label: "Controller", value: "Seeed XIAO ESP32-S3, BLE" },
          { label: "Analysis", value: "Python, 26 unit tests" },
        ]}
      />

      <CaseSection id="problem" label="01 · The problem" title="Motion breaks wrist PPG">
        <p>
          A PPG sensor shines light into the skin and measures how much comes back as blood volume changes with each
          heartbeat. When your wrist moves, the sensor shifts against the skin and the motion shows up in the same
          signal, often at a rate close to your heart rate. Many devices still show a number during that time.
        </p>
        <p>
          My rule for this project is that every heart-rate estimate carries a quality flag, and a reading taken
          during flagged motion is withheld. The question I want to answer is whether a small student-built sensor
          can give useful pulse estimates while honestly marking the intervals it can&apos;t trust.
        </p>
      </CaseSection>

      <CaseSection id="hardware" label="02 · Hardware" title="Breakout boards first, enclosure later">
        <p>
          The parts are bought and I&apos;m assembling the first bench build now. It uses separate breakout boards
          on one I2C bus so each sensor can be checked and replaced on its own. The firmware reads each sensor&apos;s ID register at startup and reports a pass or fail before
          streaming anything.
        </p>
        <dl className="spec-list">
          <div><dt>Pulse</dt><dd>MAX30102 with red and infrared channels, stored as raw counts.</dd></div>
          <div><dt>Motion</dt><dd>BMI270 six-axis IMU, sampled on the same clock as the PPG.</dd></div>
          <div><dt>Temperature</dt><dd>TMP117 for skin-adjacent temperature, added only after pulse and motion are stable.</dd></div>
          <div><dt>Controller</dt><dd>Seeed XIAO ESP32-S3: small, has Bluetooth Low Energy, and is easy to program. A later low-power version could move to an nRF52840.</dd></div>
        </dl>
        <p>
          The enclosure comes after the electronics are measured. The first wrist housing is adjustable on purpose:
          swappable sensor carriers set how far the sensor presses into the skin, and a black light barrier around the
          window keeps LED light from leaking straight back into the detector. Those two variables change signal
          quality, so I want to test them rather than guess them.
        </p>
      </CaseSection>

      <CaseSection id="protocol" label="03 · Data link" title="A binary protocol with nothing hidden">
        <p>
          The wearable sends raw samples, not finished numbers, so I can change the algorithms later and diagnose
          problems from the data. Each sample is a 36-byte packet with a sequence number, a microsecond timestamp,
          both PPG channels, six IMU axes, temperature and a set of flags.
        </p>
        <ul>
          <li>The sequence number makes dropped packets countable instead of invisible.</li>
          <li>The flags mark sensor buffer overflows, dropped samples and sensors that are still recovering.</li>
          <li>Every frame starts with a version byte and a length, so the receiver rejects anything truncated or from an unknown version.</li>
        </ul>
        <p>
          A full framed sample is 40 bytes, which doesn&apos;t fit Bluetooth&apos;s default 20-byte payload. The
          protocol requires a negotiated larger packet size, or tested batching, before the full stream is turned on.
        </p>
      </CaseSection>

      <CaseSection id="analysis" label="04 · Analysis" title="Heart rate only when the signal allows it" wide>
        <p>
          The Python pipeline decodes the packets, removes the slow baseline from the infrared channel, finds peaks
          with a minimum spacing between beats, and takes heart rate from the median interval over a 10-second
          window. It counts dropped packets from gaps in the sequence numbers. When a sample is flagged for motion,
          the heart-rate output goes blank instead of carrying the last value forward.
        </p>
        <Figure
          src={asset("/projects/wearable-physio-monitor/synthetic-replay.png")}
          alt="Three stacked plots of PPG, acceleration and heart rate over 15 seconds, with heart rate blank during the flagged walking and spike period"
          caption="Synthetic replay, not a measurement. Fifteen seconds of generated still, walking, spike and recovery data run through the pipeline. Heart rate is withheld across the flagged section."
        />
        <p>
          The same pipeline drives a live Streamlit dashboard that replays sessions in real time. Before any hardware
          was connected, I also wrote simulated MAX30102 and BMI270 chips for the Wokwi circuit simulator, so the
          firmware&apos;s I2C bring-up could be tested against something that answers like the real parts.
        </p>
      </CaseSection>

      <CaseSection id="validation" label="05 · Validation" title="How it will be judged">
        <p>
          The plan is to compare against a chest strap or ECG rather than another wrist device, because two wrist
          sensors can fail the same way during motion. Sessions cover sitting, standing, walking, recovery, and loose
          and firm fit.
        </p>
        <p>
          For each condition I&apos;ll report error against the reference alongside coverage, meaning the share of time
          the device was willing to give a number. Low error means little if the device only answered when you were
          sitting still. Packet loss, latency, reconnects, current draw and runtime are measured too. The results
          table stays empty until there are real measurements to put in it.
        </p>
      </CaseSection>
    </CaseStudyPage>
  );
}
