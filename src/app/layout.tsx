import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["900", "100"],
});

export const metadata: Metadata = {
  title: "CollegePriceCheck — Real costs, not marketing.",
  description: "See what families like yours actually paid at 1,983 colleges. Federal data. No signup. No guessing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
