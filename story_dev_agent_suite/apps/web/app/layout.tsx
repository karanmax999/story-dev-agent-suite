import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for clean, modern look
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Story Dev Ecosystem",
  description: "The ultimate toolkit for Story Protocol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
