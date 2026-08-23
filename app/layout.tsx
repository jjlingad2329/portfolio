import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jommel Joseph R. Lingad | Lead DevOps Engineer & Developer",
  description:
    "Lead DevOps Engineer and Developer specializing in CI/CD, Docker, automation, infrastructure reliability, and intelligent software.",
  keywords: [
    "DevOps Engineer",
    "CI/CD",
    "Docker",
    "Automation",
    "Software Developer",
    "Philippines",
  ],
  openGraph: {
    title: "Jommel Joseph R. Lingad | Lead DevOps Engineer & Developer",
    description:
      "Engineering reliable infrastructure, automated delivery, and intelligent software.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1792,
        height: 1024,
        alt: "Jommel Joseph R. Lingad — Lead DevOps Engineer and Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jommel Joseph R. Lingad | Lead DevOps Engineer & Developer",
    description:
      "Engineering reliable infrastructure, automated delivery, and intelligent software.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
