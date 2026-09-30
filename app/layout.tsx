import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seraya - Platform Edukasi Keuangan",
  description: "Platform edukasi keuangan untuk generasi yang lebih sadar.",
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RobotMascot from "./components/RobotMascot";
import CustomCursor from "./components/CustomCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#111111] overflow-x-hidden relative">
        <CustomCursor />
        <Navbar />
        {children}
        <RobotMascot />
        <Footer />
      </body>
    </html>
  );
}
