import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Friendly Time",
  description: "Get various date formats from a human-friendly input."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="overflow-y-scroll" lang="en">
      <body className={`${inter.className} flex min-h-screen justify-center bg-white p-5 text-black dark:bg-black dark:text-white`}>{children}</body>
    </html>
  );
}
