export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a file in /public with the deploy base path. */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "Sahil Khan",
  title: "Sahil Khan · Biomedical & Mechanical Engineering",
  description:
    "Engineering portfolio of Sahil Khan, a biomedical engineering student at Drexel University working on prosthetic devices, spacecraft mechanisms, simulation and CAD automation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahil101905.github.io",
  email: "sk4363@drexel.edu",
  personalEmail: "skhan101905@gmail.com",
  foundryEmail: "sahil@foundryphl.com",
  linkedin: "https://www.linkedin.com/in/sahil-k2/",
  github: "https://github.com/Sahil101905",
  resume: "/resumes/sahil-khan-engineering-resume.pdf",
  leadershipResume: "/resumes/sahil-khan-leadership-resume.pdf",
};

/** Absolute URL for link previews (Open Graph), which can't use relative paths. */
export const absolute = (path: string) => `${site.url}${path}`;
