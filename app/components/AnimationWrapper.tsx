"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationWrapperProps {
  children: ReactNode;
}

export default function AnimationWrapper({ children }: AnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animations
    gsap.from(".hero-element", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".hero-badge", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
      delay: 0.5,
    });

    // Scroll Animations
    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen relative overflow-hidden bg-white">
      {children}
    </div>
  );
}
