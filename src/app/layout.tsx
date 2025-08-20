import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Complete AI Platform for Dental Practice Growth | DSM Solutions",
  description:
    "DSM Solutions' dental AI platform increases practice revenue by 40%+ through automated patient acquisition, clinical excellence, and operational efficiency. Get your ROI assessment.",
  metadataBase: new URL("https://www.dsmsolutions.com"),
  openGraph: {
    title: "Complete AI Platform for Dental Practice Growth | DSM Solutions",
    description:
      "Increase revenue 40%+ with DSM Solutions' complete dental AI platform. Get your practice growth assessment.",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-[#f7f5f2] text-[#2d3748]`}>
      <head>
        <Script crossOrigin="anonymous" src="//unpkg.com/same-runtime/dist/index.global.js" />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-[#f7f5f2] selection:bg-[#d4af37]/20 selection:text-[#1a365d]">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
