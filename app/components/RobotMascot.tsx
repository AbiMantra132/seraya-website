"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RobotMascot() {
  const pathname = usePathname();
  const mascotRef = useRef<HTMLDivElement>(null);
  const eyesGroupRef = useRef<SVGGElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<"online" | "offline" | "checking">("checking");
  
  // Hide on quiz and admin pages to avoid distraction
  const isHiddenPage = pathname === "/quiz" || pathname === "/admin";

  useEffect(() => {
    if (isHiddenPage || isOpen) return; // Don't attach listener if not visible or chat is open

    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current || !eyesGroupRef.current) return;

      const rect = mascotRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.02, 6);

      const eyeX = Math.cos(angle) * distance;
      const eyeY = Math.sin(angle) * distance;

      eyesGroupRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHiddenPage, isOpen]);

  // Polling for AI Status when chat is open
  useEffect(() => {
    if (isHiddenPage || !isOpen) return;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/chat/status");
        if (res.ok) {
          setAiStatus("online");
        } else {
          setAiStatus("offline");
        }
      } catch {
        setAiStatus("offline");
      }
    };

    checkStatus(); // Initial check
    const interval = setInterval(checkStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [isHiddenPage, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: messages,
          message: userMessage
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { role: "model", content: data.reply }]);
        setAiStatus("online");
      } else {
        setMessages(prev => [...prev, { role: "model", content: "Maaf, sistem sedang sibuk atau offline. Silakan coba lagi nanti." }]);
        setAiStatus("offline");
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", content: "Koneksi terputus." }]);
      setAiStatus("offline");
    } finally {
      setIsLoading(false);
    }
  };

  if (isHiddenPage) return null;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] md:w-[400px] h-[500px] bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/40 ring-1 ring-black/5 animate-in slide-in-from-bottom-5 zoom-in-95 duration-300">
          <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9D42] p-4 flex justify-between items-center text-white shadow-sm z-10 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-white shadow-inner border border-white/20">
                AI
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-wide">Seraya AI</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${aiStatus === "online" ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" : aiStatus === "checking" ? "bg-white/50 animate-pulse" : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"}`}></span>
                  <span className="text-[11px] text-white/90 font-medium tracking-widest uppercase">
                    {aiStatus === "online" ? "Online" : aiStatus === "checking" ? "Checking..." : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-[#F5F7FA] to-[#F9F9F9] flex flex-col gap-4 scroll-smooth">
            <div className="self-start bg-white border border-[#EAEAEA] p-3.5 px-4 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm text-[14.5px] text-[#333333] leading-relaxed">
              Halo! Saya Asisten AI Seraya. Apa yang ingin Anda ketahui seputar ekonomi, bisnis, atau keuangan hari ini?
            </div>
            {messages.map((msg, i) => (
              <div key={i} className={`p-3.5 px-4 rounded-2xl max-w-[85%] text-[14.5px] shadow-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user" 
                  ? "self-end bg-gradient-to-br from-[#111111] to-[#222222] text-white rounded-tr-sm" 
                  : "self-start bg-white border border-[#EAEAEA] text-[#333333] rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-white border border-[#EAEAEA] p-3.5 px-4 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                <div className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EAEAEA] flex items-center gap-2 relative z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu..." 
              className="flex-1 bg-[#F3F4F6] border border-transparent focus:border-[#FF7A00]/30 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none px-4 py-3 rounded-2xl text-[14.5px] transition-all duration-200"
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="w-12 h-12 shrink-0 bg-gradient-to-br from-[#FF7A00] to-[#FF9D42] text-white rounded-2xl flex items-center justify-center hover:shadow-[0_8px_16px_-4px_rgba(255,122,0,0.4)] transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none active:scale-95">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 mt-0.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Mascot Button */}
      <div 
        ref={mascotRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(255,122,0,0.3)] flex flex-col items-center group relative"
      >
      {/* Tooltip / Chat bubble that appears on hover */}
      <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF7A00] text-white text-sm font-bold py-2 px-4 rounded-xl whitespace-nowrap pointer-events-none shadow-lg">
        Tanya Seraya AI
        {/* Chat bubble tail */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-[#FF7A00]"></div>
      </div>

      {/* Robot SVG */}
      <svg width="72" height="72" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[float_4s_ease-in-out_infinite]">
        {/* Head/Body */}
        <rect x="15" y="20" width="70" height="60" rx="16" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="4" />
        
        {/* Ears */}
        <rect x="5" y="40" width="10" height="20" rx="4" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="3" />
        <rect x="85" y="40" width="10" height="20" rx="4" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="3" />
        
        {/* Antenna Top */}
        <line x1="50" y1="20" x2="50" y2="6" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="6" r="4" fill="#FF7A00" />

        {/* Screen / Face Background */}
        <rect x="25" y="30" width="50" height="40" rx="10" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="2" strokeOpacity="0.5" />

        {/* Eyes (Movable) */}
        <g ref={eyesGroupRef} style={{ transition: 'transform 0.1s ease-out' }}>
          {/* Left Eye */}
          <rect x="35" y="42" width="10" height="14" rx="5" fill="#FF7A00" />
          {/* Right Eye */}
          <rect x="55" y="42" width="10" height="14" rx="5" fill="#FF7A00" />
        </g>
      </svg>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      </div>
    </div>
  );
}
