import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Cormorant_Garamond, Space_Mono } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteDescription =
  "ManifestLab is a small studio that makes a few good things, quietly. The home of Riff, Steadfast, and more — by Cognitive Core Technologies LLC.";

export const metadata: Metadata = {
  metadataBase: new URL("https://manifestlab.dev"),
  icons: {
    icon: "/icon.svg",
  },
  title: "ManifestLab",
  description: siteDescription,
  authors: [{ name: "ManifestLab" }],
  openGraph: {
    title: "ManifestLab",
    description: siteDescription,
    url: "https://manifestlab.dev",
    siteName: "ManifestLab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManifestLab",
    description: siteDescription,
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
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${cormorant.variable} ${spaceMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ManifestLab",
                legalName: "Cognitive Core Technologies LLC",
                url: "https://manifestlab.dev",
                description: siteDescription,
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "contact@manifestlab.dev",
                  contactType: "customer support",
                },
                sameAs: [],
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
