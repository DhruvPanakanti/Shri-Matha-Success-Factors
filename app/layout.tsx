import type { Metadata } from "next";
import { Tenor_Sans, Plus_Jakarta_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";

const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tenor",
});

const jakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const ebGaramond = EB_Garamond({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: "Shree Matha Success Factors — Aspire · Aim · Achieve",
  description:
    "Hyderabad's most trusted coaching institution. 12+ years of expert faculty, live classes, EAMCET & JEE coaching, and proven student results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${tenorSans.variable} ${jakartaSans.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
