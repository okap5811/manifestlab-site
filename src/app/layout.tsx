import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
  },
  title: "ManifestLab | AI & ML Consulting Studio",
  description:
    "ManifestLab is a consulting studio that helps businesses harness the power of AI, machine learning, and data science — from strategy to implementation.",
  keywords: [
    "AI consulting",
    "machine learning",
    "data science",
    "ML consulting",
    "AI strategy",
    "technical consulting",
  ],
  authors: [{ name: "ManifestLab" }],
  openGraph: {
    title: "ManifestLab | AI & ML Consulting Studio",
    description:
      "ManifestLab is a consulting studio that helps businesses harness the power of AI, machine learning, and data science — from strategy to implementation.",
    url: "https://manifestlab.dev",
    siteName: "ManifestLab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManifestLab | AI & ML Consulting Studio",
    description:
      "ManifestLab is a consulting studio that helps businesses harness the power of AI, machine learning, and data science — from strategy to implementation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
