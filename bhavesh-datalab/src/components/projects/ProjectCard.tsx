"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { ArrowRight, GitBranch } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";

interface ProjectCardProps {
  project: Project;
  onCursorChange: (text: string) => void;
}

export default function ProjectCard({ project, onCursorChange }: Readonly<ProjectCardProps>) {
  const [modalOpen, setModalOpen] = useState(false);
  const projectNumber = `PROJECT ${String(project.id).substring(0, 2).toUpperCase()}`;
  const visualBars = [42, 56, 64, 78, 60, 48];

  return (
    <>
      <motion.article
        className="project-card group flex min-h-[520px] flex-col justify-between rounded-2xl border border-[#26354C] bg-[#111D32] p-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ y: -6, rotateX: 1.25, rotateY: -1.25 }}
        transition={{ duration: 0.35 }}
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={() => onCursorChange("VIEW")}
        onMouseLeave={() => onCursorChange("")}
      >
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-[0.2em] text-[#38BDF8] uppercase">{projectNumber}</span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="rounded-md border border-[#26354C] bg-[#0B1220] px-2 py-1 text-[9px] font-medium tracking-[0.14em] text-[#94A3B8] uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-5 overflow-hidden rounded-xl border border-[#26354C] bg-[#1A2A43] p-3">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              <span className="ml-3 text-[9px] font-medium tracking-[0.18em] text-[#64748B] uppercase">Dashboard Preview</span>
            </div>

            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={`${project.name} dashboard preview`}
                className="h-40 w-full rounded-lg border border-[#26354C] object-cover"
              />
            ) : (
              <div className="flex h-40 items-end gap-2 rounded-lg border border-[#26354C] bg-[#0B1220] p-3">
                {visualBars.map((bar, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div className="w-full rounded-t-md bg-[#38BDF8]" style={{ height: `${bar}%` }} />
                    <span className="text-[7px] text-[#64748B]">{index + 1}</span>
                  </div>
                ))}
              </div>
            )}

            {!project.imageUrl && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-[#26354C] bg-[#0B1220] p-2">
                  <div className="mb-1 h-1.5 w-10 rounded-full bg-[#38BDF8]" />
                  <div className="h-1.5 w-6 rounded-full bg-[#26354C]" />
                </div>
                <div className="rounded-lg border border-[#26354C] bg-[#0B1220] p-2">
                  <div className="mb-1 h-1.5 w-12 rounded-full bg-[#8B5CF6]" />
                  <div className="h-1.5 w-7 rounded-full bg-[#26354C]" />
                </div>
                <div className="rounded-lg border border-[#26354C] bg-[#0B1220] p-2">
                  <div className="mb-1 h-1.5 w-9 rounded-full bg-[#CBD5E1]" />
                  <div className="h-1.5 w-5 rounded-full bg-[#26354C]" />
                </div>
              </div>
            )}
          </div>

          <h3 className="text-2xl font-semibold text-[#F8FAFC]">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{project.shortDescription}</p>

          {project.id === "customer-churn-analysis" && (
            <div className="mt-5 grid grid-cols-2 gap-2 border-y border-[#26354C] py-3">
              {[
                ["26.6%", "OVERALL CHURN"],
                ["42.7%", "MONTH-TO-MONTH CONTRACT"],
                ["2.8%", "TWO-YEAR CONTRACT"],
                ["45.3%", "ELECTRONIC CHECK"],
                ["47.7%", "0-12 MONTH TENURE"],
              ].map(([value, label], index) => (
                <div key={label} className={index === 0 || index === 3 ? "text-[#38BDF8]" : "text-[#CBD5E1]"}>
                  <div className="text-lg font-bold leading-none">{value}</div>
                  <div className="mt-1 text-[8px] font-medium tracking-[0.12em] text-[#64748B]">{label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.focus.slice(0, 4).map((focus) => (
              <span key={focus} className="rounded-md border border-[#26354C] bg-[#0B1220] px-2 py-1 text-[9px] font-medium tracking-[0.14em] text-[#64748B] uppercase">
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-[#26354C] pt-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#F8FAFC] hover:text-[#38BDF8]"
            >
              <span>VIEW CASE STUDY</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#94A3B8] hover:text-[#38BDF8]"
                onMouseEnter={() => onCursorChange("GITHUB")}
                onMouseLeave={() => onCursorChange("")}
                onClick={(e) => e.stopPropagation()}
              >
                <GitBranch size={14} />
                CODE
              </a>
            )}
          </div>
        </div>
      </motion.article>

      {modalOpen && (
        <CaseStudyModal
          project={project}
          onClose={() => setModalOpen(false)}
          onCursorChange={onCursorChange}
        />
      )}
    </>
  );
}