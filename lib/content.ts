export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  context: string;
  role: string;
  tools: string[];
  cover: string;
  coverAlt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tetra-chiral-prosthetic-lattice",
    title: "Tetra-chiral prosthetic lattice",
    summary:
      "Designed chiral unit cells for a lightweight prosthetic leg, ran nonlinear FEA, then printed and compression-tested specimens against an ASTM control. Failure-mode analysis pointed to 2×2×10 tessellations as the best configuration for load distribution.",
    year: "2024 – 2025",
    context: "Zheng Research Lab",
    role: "CAD, FEA, fabrication, testing",
    tools: ["SolidWorks", "Nonlinear FEA", "3D printing", "Compression testing"],
    cover: "/projects/tetra-chiral/cover.png",
    coverAlt: "CAD render of a tetra-chiral lattice unit cell",
  },
  {
    slug: "emg-prosthetic-hand",
    title: "Modular prosthetic hand with EMG control",
    summary:
      "A low-cost, repairable upper-limb prosthetic that pairs a 3D-printed finger linkage and linear actuation with a muscle-signal pipeline for intent prediction.",
    year: "2025 – 2026",
    context: "J&J Engineering Showcase · team of 6",
    role: "System architecture, EMG software",
    tools: ["SolidWorks", "Raspberry Pi", "ATmega32U4", "EMG processing"],
    cover: "/projects/emg-prosthetic/cover.png",
    coverAlt: "CAD render of the complete prosthetic hand mechanism",
  },
  {
    slug: "morph-claw-arm",
    title: "Three-finger claw arm for MORPH",
    summary:
      "A 3D-printed arm with a gear-driven three-finger claw that closes into a pointer and opens to grab, designed around the servos and stepper on hand. Includes ESP32 firmware that checks every pose for collisions before moving. Demoed to the OwlHacks judges.",
    year: "2026",
    context: "OwlHacks · team project",
    role: "Arm and claw design, arm firmware",
    tools: ["OpenSCAD", "3D printing", "ESP32", "Inverse kinematics"],
    cover: "/projects/morph-claw-arm/cover.jpg",
    coverAlt: "CAD render of the robot arm reaching down with its three-finger claw open",
  },
  {
    slug: "negative-pressure-helmet",
    title: "Negative-pressure isolation helmet",
    summary:
      "A $68 bench prototype that contains nebulizer aerosol by pulling air through a HEPA exhaust. Six requirements were traced to a Simulink model and repeated bench tests.",
    year: "2025",
    context: "Design course · team of 4",
    role: "Integration, verification, build",
    tools: ["Simulink", "Design controls", "Bench testing", "Prototyping"],
    cover: "/projects/negative-pressure-helmet/cover.jpg",
    coverAlt: "Built negative-pressure helmet prototype with a clear shell and filtered exhaust",
  },
];

export const software = [
  {
    title: "NX-to-MATLAB design automation",
    tag: "Naval Research Laboratory",
    body:
      "A Python application built on the NX Open API that automates generating and exporting STEP CAD files, supporting organization-wide rapid prototyping. Paired with MATLAB/Simulink evaluation of the generated designs.",
    note: "Organization-specific geometry, parameters and results are not shown.",
  },
  {
    title: "REEF",
    tag: "Contributor",
    body: "Contributing to a software platform for designing and analyzing biological systems.",
    link: { label: "reef.bio", href: "https://reef.bio" },
  },
  {
    title: "EXODUS TPL: requirement-driven design verification",
    tag: "Exodus Industries · 2026 – now",
    body:
      "A platform that takes a CAD model and a list of engineering requirements and returns editable CAD, a pass or fail for every requirement, and an audit trail behind each result. It runs structural, vibration, thermal, flow and manufacturability checks in one place instead of across separate tools. In a demonstration study it took a four-part valve through 24 design candidates in 35.5 minutes unattended, found that the starting design failed its flow requirement, and identified two candidates that met all five requirements. Results are deterministic, and the core structural and vibration engines pass 14 of 14 analytic verification groups.",
    note: "Python, FastAPI, React, ROS 2, FEA and CFD. Also applied to a $100K+ surgical endoscope development program. Internal methods are proprietary and not shown.",
  },
];

export type ModelingProject = {
  title: string;
  method: string;
  body: string;
  image?: string;
  imageAlt?: string;
  link?: { label: string; href: string };
  gallery?: { src: string; alt: string; caption: string }[];
};

export const modeling: ModelingProject[] = [
  {
    title: "COVID transmission on synthetic contact networks",
    method: "SEIR ODEs · network simulation",
    body:
      "Compared a continuous SEIR model solved with ode45 against an agent-level simulation of 10,000 people on a power-law contact network, then measured how contact, recovery and quarantine parameters shift peak infections. With Alexandra Nickel and Lily Wagner.",
    image: "/matlab/bcopsim-contact-network.png",
    imageAlt: "Contact-network infection states on days 1, 42 and 100",
    link: { label: "Project report (DOCX)", href: "/matlab/bcopsim-report.docx" },
    gallery: [
      { src: "/matlab/bcopsim-parameters.jpg", alt: "Parameter analysis plots for contact, transmission and recovery rates", caption: "Parameter sensitivity" },
      { src: "/matlab/bcopsim-quarantine.jpg", alt: "Effect of quarantine on peak infections and time to peak", caption: "Quarantine study" },
    ],
  },
  {
    title: "Muscle-spindle feedback model",
    method: "Simulink",
    body: "A block-diagram model of a physiological feedback loop, used to study stimulus, dynamic response and feedback in the time domain.",
    image: "/matlab/muscle-spindle.png",
    imageAlt: "Simulink model of a muscle spindle feedback system",
  },
  {
    title: "Automated cell counting",
    method: "Image processing",
    body: "Counts cells in microscopy images using Sobel edge detection, morphological cleanup and connected-component labeling.",
    image: "/matlab/cell-counting.jpg",
    imageAlt: "Microscope image used for cell segmentation",
  },
  {
    title: "Compartment models in SimBiology",
    method: "Systems biology",
    body: "Expressed biological state transitions as species and reactions, then ran parameterized simulations to see how interactions change system behavior.",
    image: "/matlab/simbiology-covid.png",
    imageAlt: "SimBiology compartment model and simulation results",
  },
  {
    title: "Configurable EMG analysis pipeline",
    method: "Signal processing",
    body:
      "Imports muscle signals, applies selectable zero-phase Butterworth filtering, rectification and moving-window smoothing, then normalizes to maximum voluntary contraction.",
  },
  {
    title: "Protein folding by genetic algorithm",
    method: "Optimization",
    body:
      "A 3D fitness function that rewards feasible hydrogen bonds and penalizes invalid residue spacing and steric collisions.",
  },
  {
    title: "Mass-spring-damper parameter fitting",
    method: "Numerical methods",
    body: "Estimates stiffness, damping and initial conditions by simulating the system with improved Euler integration and minimizing error against measured data.",
  },
];

export const experience = [
  {
    when: "Sep 2025 – Mar 2026",
    org: "U.S. Naval Research Laboratory",
    role: "Spacecraft Mechanisms Design Engineer, Co-op",
    detail: "Simulated and debugged a PID flight controller in MATLAB/Simulink with Monte Carlo parameter sweeps, designed actuated mechanisms and test fixtures for high-temperature, compact environments in Siemens NX, and built NX Open automation for STEP generation.",
  },
  {
    when: "Sep 2024 – Mar 2025",
    org: "Estée Lauder Companies",
    role: "Manufacturing Engineer Co-op, Commercialization & Validation",
    detail: "Process validation that cut manufacturing costs by 15%, validation testing across 250+ products to FDA and EMEA standards, and regulatory documentation for $1M+ global launches.",
  },
  {
    when: "2025 – now",
    org: "The Foundry",
    role: "Co-founder",
    detail: "Building a Philadelphia community for founders and builders that has connected 10,000+ people through events, mentorship and access to capital.",
  },
  {
    when: "2024 – now",
    org: "Drexel IEEE",
    role: "President",
    detail: "Leading a 700+ member student chapter, a five-person executive board and an industry partnership program.",
  },
];
