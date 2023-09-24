import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Friendly Time Parser",
  description: "Get various date formats and timezone info from a human-friendly input.",
  metadataBase: new URL("https://friendly-time.vercel.app"),
  openGraph: {
    title: "Friendly Time Parser",
    description: "Get various date formats from a human-friendly input.",
    url: "https://friendly-time.vercel.app",
    siteName: "Friendly Time Parser",
    locale: "en-US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Friendly Time Parser",
    description: "Get various date formats from a human-friendly input.",
    creator: "@mozzyfx"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="overflow-y-scroll" lang="en">
      <body className={`${inter.className} flex min-h-screen justify-center bg-white p-5 text-black dark:bg-black dark:text-white`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
