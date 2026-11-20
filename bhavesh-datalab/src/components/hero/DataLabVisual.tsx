"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DataLabVisualProps {
  onCursorChange: (text: string) => void;
}

export default function DataLabVisual({ onCursorChange }: DataLabVisualProps) {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const nodes = [
    { id: 1, label: "RAW DATA", x: 100, y: 40, detail: "Dataset retrieved" },
    { id: 2, label: "CLEANING", x: 300, y: 88, detail: "Fields checked and transformed" },
    { id: 3, label: "ANALYSIS", x: 500, y: 40, detail: "Patterns compared across segments" },
    { id: 4, label: "INSIGHT", x: 700, y: 88, detail: "Findings summarized" },
    { id: 5, label: "DECISION", x: 900, y: 40, detail: "Business recommendations" },
  ];
  const pipelinePath =
    "M 100 40 C 160 40 240 88 300 88 C 360 88 440 40 500 40 C 560 40 640 88 700 88 C 760 88 840 40 900 40";

  return (
    <div className="lab-monitor-shell">
      <div
        className="lab-visual relative flex h-[380px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#26354C] bg-[#111D32] p-4 sm:p-6"
        onMouseEnter={() => onCursorChange("ANALYSE")}
        onMouseLeave={() => onCursorChange("")}
      >
      {/* Top Header of Lab Window */}
      <div className="flex items-center justify-between border-b border-[#26354C] pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-sky-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-violet-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-300/80" />
          <span className="ml-2 text-[10px] font-mono text-[#64748B] sm:text-[11px]">LAB_ENVIRONMENT // PIPELINE_ACTIVE</span>
        </div>
        <div className="rounded border border-[#26354C] bg-[#1A2A43] px-2 py-0.5 text-[10px] font-mono text-[#CBD5E1]">
          DATA → DECISION
        </div>
      </div>

      {/* Interactive SVG / Canvas Data Flow Visual */}
      <div className="relative flex-1 my-4 flex items-center justify-center">
        <div className="pipeline-stage relative w-full shrink-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 227"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              d={pipelinePath}
              fill="none"
              stroke="#26354C"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <motion.path
              d={pipelinePath}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray="8 24"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: shouldReduceMotion ? 0 : -32 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 3, repeat: Infinity, ease: "linear" }
              }
            />
          </svg>

          <div className="absolute inset-0">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer"
                style={{ left: `${node.x / 10}%`, top: `${(node.y / 227) * 100}%` }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.15 }}
                onHoverStart={() => setActiveNode(node.id)}
                onHoverEnd={() => setActiveNode(null)}
              >
                <div className="-ml-2 -mt-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#111D32] bg-[#38BDF8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0B1220] animate-ping" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0">
            {nodes.map((node) => (
              <span
                key={node.id}
                className="pointer-events-auto absolute top-[70%] -translate-x-1/2 cursor-pointer whitespace-nowrap rounded border border-[#26354C] bg-[#F8FAFC] px-0.5 py-0.5 text-[9px] font-mono leading-none text-[#0B1220] sm:text-[11px]"
                style={{ left: `${node.x / 10}%` }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {node.label}
              </span>
            ))}
          </div>
        </div>

        {/* Active Node Detail Tooltip Box */}
        {activeNode && (
          <motion.div 
            className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded border border-[#26354C] bg-[#1A2A43] p-2 text-xs font-mono text-[#94A3B8]"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>STATUS: {nodes.find(n => n.id === activeNode)?.detail}</span>
            <span className="text-[#38BDF8]">NODE_ID: 0{activeNode}</span>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer of Lab Window */}
      <div className="flex items-center justify-between border-t border-[#26354C] pt-3 text-[11px] font-mono text-[#64748B]">
        <span>ENGINE: PYTHON / SQL / PANDAS</span>
        <span className="text-[#8B5CF6]">● READY FOR DEPLOYMENT</span>
      </div>
      </div>
    </div>
  );
}