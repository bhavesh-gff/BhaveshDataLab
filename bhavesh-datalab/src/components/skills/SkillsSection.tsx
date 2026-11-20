"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData, SkillItem } from "@/data/skills";
import { Cpu, CheckCircle } from "lucide-react";

interface SkillsSectionProps {
  onCursorChange: (text: string) => void;
}

export default function SkillsSection({ onCursorChange }: Readonly<SkillsSectionProps>) {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillsData[0].skills[0]);

  return (
    <section id="skills" className="flex justify-center bg-[#0B1220] px-4 py-20 sm:py-24">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <div className="text-[10px] font-medium tracking-[0.22em] text-[#38BDF8] uppercase">Skills & Toolkit</div>
          <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] sm:text-3xl">Analytical capabilities</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            {skillsData.map((cat) => (
              <div key={cat.category} className="rounded-2xl border border-[#26354C] bg-[#111D32] p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] text-[#38BDF8] uppercase">
                  <Cpu size={14} />
                  {cat.category}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        className={`rounded-md border px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] uppercase transition-all ${
                          isSelected
                            ? "border-[#38BDF8] bg-[#38BDF8] text-[#F8FAFC]"
                            : "border-[#26354C] bg-[#0B1220] text-[#94A3B8] hover:border-[#38BDF8]"
                        }`}
                        onMouseEnter={() => onCursorChange("INSPECT")}
                        onMouseLeave={() => onCursorChange("")}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                className="rounded-2xl border border-[#26354C] bg-[#111D32] p-6 shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#26354C] pb-4">
                  <h3 className="text-2xl font-semibold text-[#F8FAFC]">{selectedSkill.name}</h3>
                  <span className="rounded-md border border-[#26354C] bg-[#1C2540] px-2 py-1 text-[9px] font-medium tracking-[0.14em] text-[#CBD5E1] uppercase">Verified</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">{selectedSkill.description}</p>

                <div className="mt-6">
                  <div className="mb-3 text-[10px] font-medium tracking-[0.18em] text-[#64748B] uppercase">What I use it for</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.keyPoints.map((kp) => (
                      <span key={kp} className="inline-flex items-center gap-2 rounded-md border border-[#26354C] bg-[#0B1220] px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-[#94A3B8] uppercase">
                        <CheckCircle size={12} className="text-[#38BDF8]" />
                        {kp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-[#26354C] pt-4">
                  <div className="mb-3 text-[10px] font-medium tracking-[0.18em] text-[#64748B] uppercase">Where I applied it</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.usedIn.map((proj) => (
                      <span key={proj} className="rounded-md border border-[#26354C] bg-[#1C2540] px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-[#CBD5E1] uppercase">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}