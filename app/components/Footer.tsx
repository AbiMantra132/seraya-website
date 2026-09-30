"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/quiz" || pathname === "/admin") return null;

  return (
    <footer className="w-full bg-white border-t border-[#EAEAEA] py-12 px-6 relative z-10 mt-auto">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-black text-2xl text-[#111111] tracking-tighter">Seraya.</span>
          <span className="text-[#555555] text-sm font-medium">© {new Date().getFullYear()} Serentak Berkarya. All rights reserved.</span>
        </div>
        
        <div className="flex items-center">
          <a href="https://www.instagram.com/serentak.berkarya/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#F5F5F5] text-[#111111] font-bold text-sm hover:bg-[#FF7A00] hover:text-white transition-all duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
