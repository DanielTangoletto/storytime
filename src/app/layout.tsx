import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Storytime, le temps qui défile",
  description: "Calcul d'âge en temps réel.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/time.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/time.png",
    apple: "/time.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} antialiased h-screen flex flex-col`}>{children}</body>
    </html>
  );
}
