"use client";

import { useState, type FocusEvent, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DataLabVisual from "./DataLabVisual";
import { profileData } from "@/data/profile";

interface HeroSectionProps {
  onCursorChange: (text: string) => void;
}

export default function HeroSection({ onCursorChange }: Readonly<HeroSectionProps>) {
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isRevealed = isPointerOver || isFocusWithin || isPinnedOpen;
  const skillsList = ["Python", "SQL", "Pandas", "NumPy", "Matplotlib"];

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") setIsPointerOver(true);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") setIsPointerOver(false);
  };

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocusWithin(false);
    }
  };

  const togglePinnedOpen = () => {
    setIsPinnedOpen((open) => !open);
    if (window.matchMedia("(hover: none)").matches && isRevealed) {
      setIsFocusWithin(false);
    }
  };

  return (
    <section
      id="home"
      className="cinematic-hero relative flex min-h-screen items-center justify-center px-4 pb-16 pt-28 sm:pt-32"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={handleBlurCapture}
    >
      <div className="hero-stage relative mx-auto w-full max-w-7xl">
        <div className="hero-monitor-position">
          <motion.div
            className={`monitor-frame hero-monitor ${isRevealed ? "monitor-active" : ""}`}
            animate={{ scale: !shouldReduceMotion && isRevealed ? 0.97 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
          >
            <DataLabVisual onCursorChange={onCursorChange} />
          </motion.div>
        </div>

        <button
          type="button"
          className="hero-explore-control"
          aria-expanded={isRevealed}
          aria-controls={isRevealed ? "hero-content" : undefined}
          aria-label={isRevealed ? "Close hero experience" : "Explore hero content"}
          onClick={togglePinnedOpen}
        >
          <span className="hidden sm:inline">{isRevealed ? "EXPERIENCE ACTIVE" : "HOVER TO EXPLORE"}</span>
          <span className="sm:hidden">{isRevealed ? "TAP TO CLOSE" : "TAP TO EXPLORE"}</span>
        </button>

        <AnimatePresence initial={false}>
          {isRevealed && (
            <motion.div
              id="hero-content"
              className="hero-content-position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <motion.div
                className="hero-content-panel"
                initial={{ y: shouldReduceMotion ? 0 : 18 }}
                animate={{ y: 0 }}
                exit={{ y: shouldReduceMotion ? 0 : 12 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#CBD5E1]/20 bg-[#111D32]/80 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
                  <span className="text-[10px] font-medium tracking-[0.18em] text-[#CBD5E1] uppercase">
                    {profileData.label}
                  </span>
                </div>

                <h1 className="hero-display max-w-3xl text-5xl font-bold leading-[0.9] tracking-[-0.075em] text-[#F8FAFC] sm:text-6xl lg:text-7xl">
                  <span className="block">I TURN DATA</span>
                  <span className="hero-accent mt-2 block">INTO DECISIONS.</span>
                </h1>

                <p className="mt-6 max-w-xl text-base text-[#94A3B8] sm:text-lg">
                  {profileData.tagline} I turn raw data into clear business insight using Python, SQL, and modern analytical workflows.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-3 text-[11px] font-semibold tracking-[0.18em] text-[#0B1220] shadow-[0_8px_28px_rgba(56,189,248,0.16)] hover:bg-[#7DD3FC]"
                    onMouseEnter={() => onCursorChange("PROJECTS")}
                    onMouseLeave={() => onCursorChange("")}
                  >
                    VIEW MY PROJECTS
                  </a>
                  <a
                    href="/bhavesh-suthar-resume.txt"
                    download="Bhavesh-Suthar-Resume.txt"
                    className="inline-flex items-center justify-center rounded-lg border border-[#CBD5E1]/40 bg-transparent px-5 py-3 text-[11px] font-semibold tracking-[0.18em] text-[#F8FAFC] hover:border-[#38BDF8] hover:bg-[#111D32]"
                    onMouseEnter={() => onCursorChange("RESUME")}
                    onMouseLeave={() => onCursorChange("")}
                  >
                    DOWNLOAD RESUME
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] text-[#94A3B8]">
                  <span className="font-medium tracking-[0.16em] text-[#CBD5E1]">CORE STACK</span>
                  <span className="hidden h-1 w-1 rounded-full bg-[#38BDF8] sm:inline-block" />
                  {skillsList.map((skill, index) => (
                    <span key={skill} className="inline-flex items-center gap-2">
                      <span>{skill}</span>
                      {index < skillsList.length - 1 && <span className="text-[#38BDF8]">•</span>}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}