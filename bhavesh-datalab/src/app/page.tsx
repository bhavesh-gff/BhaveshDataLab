"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import RecruiterViewSection from "@/components/recruiter/RecruiterViewSection";
import ProfileSection from "@/components/profile/ProfileSection";
import DataWorkflowSection from "@/components/workflow/DataWorkflowSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProofSection from "@/components/proof/ProofSection";
import ContactSection from "@/components/contact/ContactSection";
import CustomCursor from "@/components/ui/CustomCursor";
import BackgroundEnvironment from "@/components/ui/BackgroundEnvironment";

export default function Home() {
  const [cursorText, setCursorText] = useState("");

  return (
    <main id="home" className="relative isolate min-h-screen bg-[#0B1220] text-[#F8FAFC] selection:bg-[#38BDF8] selection:text-[#F8FAFC]">
      <BackgroundEnvironment />
      <div className="relative z-10">
        <CustomCursor cursorText={cursorText} />
        <Navbar onCursorChange={setCursorText} />
        <HeroSection onCursorChange={setCursorText} />
        <RecruiterViewSection onCursorChange={setCursorText} />
        <ProfileSection onCursorChange={setCursorText} />
        <DataWorkflowSection onCursorChange={setCursorText} />
        <ProjectsSection onCursorChange={setCursorText} />
        <SkillsSection onCursorChange={setCursorText} />
        <ProofSection onCursorChange={setCursorText} />
        <ContactSection onCursorChange={setCursorText} />
        <footer className="flex flex-col items-center justify-between gap-2 border-t border-[#26354C] bg-[#111D32] px-4 py-6 text-center text-[10px] font-medium tracking-[0.16em] text-[#94A3B8] sm:flex-row sm:px-8 sm:text-left">
          <span className="text-[#F8FAFC]">BHAVESH SUTHAR</span>
          <span>DATA ANALYST <span className="text-[#38BDF8]">→</span> ASPIRING DATA SCIENTIST</span>
        </footer>
      </div>
    </main>
  );
}