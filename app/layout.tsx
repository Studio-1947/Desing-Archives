import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: "Design Archives - Challenges, Community & Portfolio",
    description: "Join design challenges, showcase your work, and connect with the creative community. Rooted in local wisdom, designed for global impact.",
    keywords: ["Design", "Challenges", "Portfolio", "Community", "Graphic Design", "UI/UX", "Brand Identity"],
    authors: [{ name: "Studio 1947" }],
    openGraph: {
        title: "Design Archives by Studio 1947",
        description: "Design challenges and community platform",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
