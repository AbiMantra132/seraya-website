"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on devices with a fine pointer (like a mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      // Directly mutate DOM for high-performance following (no React re-renders)
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // Check if the cursor is hovering over an interactive element
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, select, [role="button"], .interactive, [tabindex="0"]');
      
      setIsHovering(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transition-all duration-300 ease-out rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] ${isHovering ? 'backdrop-blur-none' : 'backdrop-blur-[6px]'}`}
      style={{
        width: isHovering ? "80px" : "32px",
        height: isHovering ? "80px" : "32px",
        marginLeft: isHovering ? "-40px" : "-16px",
        marginTop: isHovering ? "-40px" : "-16px",
        backgroundColor: isHovering ? "rgba(255, 122, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        borderColor: isHovering ? "rgba(255, 122, 0, 0.3)" : "rgba(255, 255, 255, 0.4)"
      }}
    >
    </div>
  );
}
