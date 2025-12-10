import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "IP Sandbox",
    description: "Test Story Protocol IP Registration",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-gray-50 text-gray-900">{children}</body>
        </html>
    );
}
