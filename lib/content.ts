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
      "Designed three chiral unit cells for a lightweight prosthetic leg, ran nonlinear FEA on them, then printed and compression-tested the specimens against an ASTM control.",
    year: "2024",
    context: "Summer research",
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
    year: "",
    context: "Drexel IEEE · team of 6",
    role: "System architecture, EMG software",
    tools: ["SolidWorks", "Raspberry Pi", "ATmega32U4", "EMG processing"],
    cover: "/projects/emg-prosthetic/cover.png",
    coverAlt: "CAD render of the complete prosthetic hand mechanism",
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
    tag: "Private work",
    body:
      "A Python controller that turns structured design parameters into Siemens NX geometry, runs MATLAB/Simulink evaluations on it, and exports results as JSON and CSV for review.",
    note: "Generalized from private work. Geometry, parameters and results are not shown.",
  },
  {
    title: "REEF",
    tag: "Contributor",
    body: "Contributing to a software platform for designing and analyzing biological systems.",
    link: { label: "reef.bio", href: "https://reef.bio" },
  },
  {
    title: "Finite-element analysis platform",
    tag: "In progress",
    body:
      "A modular FEA workflow that separates model setup, solving, verification against analytical cases, and result export into documented stages.",
  },
];

export type ModelingProject = {
  title: string;
  method: string;
  body: string;
  image?: string;
  imageAlt?: string;
  link?: { label: string; href: string };
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
    when: "2025 – 2026",
    org: "U.S. Naval Research Laboratory",
    role: "Spacecraft Mechanisms Design Engineer, Co-op",
    detail: "Robotic mechanisms, test fixtures and CAD automation in Siemens NX, with MATLAB/Simulink controls work.",
  },
  {
    when: "2024 – 2025",
    org: "Estée Lauder Companies",
    role: "Manufacturing Engineer",
    detail: "Process validation and technical documentation in regulated manufacturing. Contributed to a measured 15% reduction in manufacturing cost.",
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
