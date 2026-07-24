import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M. Victor Vengatesh | AI/ML Engineer",
  description:
    "The immersive Japanese temple portfolio of M. Victor Vengatesh, featuring AI, ML, NLP, and multi-agent projects.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
