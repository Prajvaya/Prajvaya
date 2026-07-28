import type { Metadata } from "next";
import { Cinzel, Outfit, Yatra_One } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-yatra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prajvaya | Rebuilding the Future with Remembered Wisdom",
  description:
    "We revive timeless traditional practices and combine them with thoughtful innovation to eliminate physical, digital, and human pollution. Join the movement for a better future.",
  keywords: [
    "Prajvaya",
    "Sustainability",
    "Digital Wellness",
    "Traditional Wisdom",
    "Village Innovation",
    "Circular Economy",
    "Sovereign Security",
    "Indigenous Tech",
    "India",
  ],
  authors: [{ name: "Subhajit Ghosh" }, { name: "Survi Mukherjee" }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/assets/logo.png", type: "image/png" }
    ],
    apple: "/apple-icon.png",
    shortcut: "/icon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${yatraOne.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream dark:bg-earth text-charcoal dark:text-cream font-sans">
        {children}
      </body>
    </html>
  );
}
