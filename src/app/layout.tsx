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

const siteDescription =
  "ManifestLab is a technical consulting studio helping businesses turn data into results — from analytics and automation to AI, machine learning, and digital transformation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://manifestlab.dev"),
  icons: {
    icon: "/icon.svg",
  },
  title: "ManifestLab | Data, AI & Technical Consulting Studio",
  description: siteDescription,
  keywords: [
    "technical consulting",
    "data consulting",
    "AI consulting",
    "machine learning",
    "data science",
    "Python consulting",
    "data analytics",
    "digital transformation",
    "automation consulting",
    "ML consulting",
    "AI strategy",
    "business intelligence",
  ],
  authors: [{ name: "ManifestLab" }],
  openGraph: {
    title: "ManifestLab | Data, AI & Technical Consulting Studio",
    description: siteDescription,
    url: "https://manifestlab.dev",
    siteName: "ManifestLab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManifestLab | Data, AI & Technical Consulting Studio",
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
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ManifestLab",
                url: "https://manifestlab.dev",
                description: siteDescription,
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "omar@manifestlab.dev",
                  contactType: "sales",
                },
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "ManifestLab",
                url: "https://manifestlab.dev",
                description: siteDescription,
                serviceType: "Technical Consulting",
                areaServed: "US",
                priceRange: "$$",
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
