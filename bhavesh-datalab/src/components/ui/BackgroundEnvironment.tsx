"use client";

export default function BackgroundEnvironment() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="environment-grid" />
      <span className="ambient-particle left-[12%] top-[22%]" />
      <span className="ambient-particle left-[28%] top-[67%]" />
      <span className="ambient-particle left-[53%] top-[31%]" />
      <span className="ambient-particle left-[74%] top-[18%]" />
      <span className="ambient-particle left-[88%] top-[72%]" />
      <span className="absolute left-[42%] top-[48%] h-1 w-1 rounded-full bg-[#38BDF8]/40 blur-[1px]" />
    </div>
  );
}