"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { GraduationCap, Target, Compass } from "lucide-react";

interface ProfileSectionProps {
  onCursorChange: (text: string) => void;
}

export default function ProfileSection({ onCursorChange }: Readonly<ProfileSectionProps>) {
  const cards = [
    {
      title: "CURRENT FOCUS",
      icon: <Target size={18} className="text-[#38BDF8]" />,
      items: profileData.currentFocus,
      accent: "bg-[#1C2540] border-[#26354C]"
    },
    {
      title: "DATA INTERESTS",
      icon: <Compass size={18} className="text-[#8B5CF6]" />,
      items: profileData.interests,
      accent: "bg-[#1A2A43] border-[#26354C]"
    },
    {
      title: "APPROACH",
      icon: <GraduationCap size={18} className="text-[#CBD5E1]" />,
      items: ["Analytical problem solving", "Finding patterns", "Data-driven decisions"],
      accent: "bg-[#111D32] border-[#26354C]"
    }
  ];

  return (
    <section id="about" className="flex justify-center px-4 py-20 sm:py-24">
      <div className="w-full max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] text-[#38BDF8] uppercase">About</div>
            <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] sm:text-3xl">Profile</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.div
            className="rounded-2xl border border-[#26354C] bg-[#111D32] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-8 lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <motion.div
                className="relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl border border-[#38BDF8]/40 bg-[#111D32] sm:h-64 sm:w-52"
                onMouseEnter={() => onCursorChange("BS")}
                onMouseLeave={() => onCursorChange("")}
                animate={{ y: [0, -6, 0] }}
                whileHover={{ scale: 1.04, rotate: -2, boxShadow: "0 0 50px rgba(56, 189, 248, 0.22)" }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/profile-photo.jpeg" alt="Bhavesh Suthar" className="h-full w-full object-cover" />
              </motion.div>
              <div className="min-w-0">
                <div className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#38BDF8] uppercase">Personal profile</div>
                <h3 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-4xl">{profileData.name}</h3>
                <p className="mt-2 text-xs font-medium tracking-[0.18em] text-[#38BDF8] uppercase">{profileData.education}</p>
                <div className="mt-5 h-px w-20 bg-[#38BDF8]" />
              </div>
            </div>

            <p className="max-w-none text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              {profileData.bio}
            </p>
          </motion.div>

          <div className="grid gap-4 lg:col-span-5">
            {cards.map((card) => (
              <motion.div
                key={card.title}
                className={`rounded-2xl border p-5 ${card.accent}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#0B1220] p-2">{card.icon}</div>
                  <h3 className="text-[11px] font-medium tracking-[0.18em] text-[#F8FAFC] uppercase">{card.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {card.items.map((item) => (
                    <span key={item} className="rounded-md border border-[#26354C] bg-[#0B1220] px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-[#94A3B8] uppercase">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}