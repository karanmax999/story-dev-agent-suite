import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ABV GenAI Agent",
    description: "GenAI + Story Protocol IP Registration",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-zinc-900 text-white">{children}</body>
        </html>
    );
}
