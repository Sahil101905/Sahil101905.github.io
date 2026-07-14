import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahil Khan — Engineering Case Studies",
  description: "Mechanical, biomedical, and software engineering case studies by Sahil Khan.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Sahil Khan — Engineering Case Studies",
    description: "From signal to structure: tested engineering systems across CAD, simulation, embedded systems, and software.",
    images: [{ url: "/og.png", width: 1664, height: 928, alt: "Sahil Khan engineering case studies" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
