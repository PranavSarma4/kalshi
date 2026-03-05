import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/demo-context";

const headingFont = IBM_Plex_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "American Red Cross | Quest and Team Dashboard",
  description: "Branded civic volunteer quest platform demo for team operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="antialiased">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
