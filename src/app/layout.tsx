import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Now Ezy — Trusted Bachelor Living Platform | 0% Rejection",
  description: "India's premier bachelor housing platform. 0% rejection, zero brokerage, direct genuine owner contacts, and live commute radar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col bg-[#F7F7F8] text-[#1D1E2C] font-sans overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}
