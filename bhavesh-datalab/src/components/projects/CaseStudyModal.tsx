"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { X, GithubIcon, CheckCircle2 } from "lucide-react";

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
  onCursorChange: (text: string) => void;
}

export default function CaseStudyModal({ project, onClose, onCursorChange }: Readonly<CaseStudyModalProps>) {
  const cs = project.caseStudy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#050507]/85 p-4 backdrop-blur-md">
      <motion.div 
        className="relative my-8 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#26354C] bg-[#0B1220] shadow-xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#26354C] bg-[#111D32] px-6 py-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold font-mono text-[#F8FAFC]">{project.name}{" // CASE STUDY"}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] hover:bg-[#1A2A43] hover:text-[#F8FAFC]"
            onMouseEnter={() => onCursorChange("CLOSE")}
            onMouseLeave={() => onCursorChange("")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto flex flex-col gap-8">
          
          {/* Overview Section */}
          <div className="grid grid-cols-1 gap-6 rounded-xl border border-[#26354C] bg-[#111D32] p-6 md:grid-cols-2">
            <div>
              <span className="text-[11px] font-mono text-[#38BDF8] block mb-1">PROBLEM STATEMENT</span>
              <p className="text-sm leading-relaxed text-[#94A3B8]">{cs.problem}</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#8B5CF6] block mb-1">ANALYTICAL OBJECTIVE</span>
              <p className="text-sm leading-relaxed text-[#94A3B8]">{cs.objective}</p>
            </div>
          </div>

          {/* Dataset Info */}
          <div>
            <h4 className="text-xs font-mono text-[#64748B] mb-2 uppercase tracking-wider">DATASET</h4>
            <div className="rounded-xl border border-[#26354C] bg-[#1A2A43] p-4 text-sm font-mono text-[#F8FAFC]">
              {cs.dataset}
            </div>
          </div>

          {/* Data Preparation */}
          <div>
            <h4 className="text-xs font-mono text-[#64748B] mb-2 uppercase tracking-wider">DATA PREPARATION & CLEANING</h4>
            <div className="flex flex-col gap-2">
              {cs.dataPreparation.map((prep, i) => (
                <div key={prep} className="flex items-start gap-3 rounded-lg border border-[#26354C] bg-[#111D32] p-3 text-sm text-[#94A3B8]">
                  <span>{prep}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis & Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono text-[#64748B] mb-2 uppercase tracking-wider">ANALYSIS STEPS</h4>
              <ul className="flex flex-col gap-2">
                {cs.analysis.map((step) => (
                  <li key={step} className="flex items-center gap-2 rounded-lg border border-[#26354C] bg-[#111D32] p-3 text-xs text-[#94A3B8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono text-[#64748B] mb-2 uppercase tracking-wider">VISUALISATION & INSIGHTS</h4>
              <ul className="flex flex-col gap-2">
                {cs.insights.map((insight) => (
                  <li key={insight} className="flex items-start gap-2 rounded-lg border border-[#26354C] bg-[#111D32] p-3 text-xs text-[#F8FAFC]">
                    <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result & Impact */}
          <div>
            <h4 className="text-xs font-mono text-[#64748B] mb-2 uppercase tracking-wider">RESULT & COMMERCIAL IMPACT</h4>
            <div className="rounded-xl border border-[#38BDF8] bg-[#1C2540] p-6 text-sm font-medium leading-relaxed text-[#F8FAFC]">
              {cs.result}
            </div>
          </div>

          {/* Technologies & Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#26354C] pt-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-md border border-[#26354C] bg-[#111D32] px-2.5 py-1 text-xs font-mono text-[#CBD5E1]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[#38BDF8] bg-[#38BDF8] px-4 py-2 text-xs font-mono text-[#F8FAFC] transition-colors hover:bg-[#8B5CF6]"
                onMouseEnter={() => onCursorChange("GITHUB")}
                onMouseLeave={() => onCursorChange("")}
              >
                <GithubIcon size={14} />
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}