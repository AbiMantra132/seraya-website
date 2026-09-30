"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/quiz" || pathname === "/admin") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/75 transition-all duration-300">
      <div className="flex items-center justify-between px-6 sm:px-12 py-5 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Seraya Logo" 
              width={200} 
              height={60} 
              className="h-12 w-auto object-contain cursor-pointer hover:scale-105 transition-transform" 
              priority 
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[16px] text-[#111111] font-medium">
          <Link href="/" className="hover:text-[#FF7A00] transition-colors">
            Home
          </Link>
          <Link href="/#about" className="hover:text-[#FF7A00] transition-colors">
            About
          </Link>
          <Link href="/#content" className="hover:text-[#FF7A00] transition-colors">
            Content
          </Link>
          <Link href="/#news" className="hover:text-[#FF7A00] transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#quiz-cta" className="bg-[#111111] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#FF7A00] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,122,0,0.3)] inline-block">
            Ikuti Kuis
          </Link>
        </div>
      </div>
    </nav>
  );
}
