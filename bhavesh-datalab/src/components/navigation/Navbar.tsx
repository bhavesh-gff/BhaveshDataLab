"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, X } from "lucide-react";

interface NavbarProps {
  onCursorChange: (text: string) => void;
}

export default function Navbar({ onCursorChange }: Readonly<NavbarProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pointerInsideRef = useRef(false);
  const keyboardNavigationRef = useRef(false);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverCapability = () => setCanHover(hoverQuery.matches);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") keyboardNavigationRef.current = true;
    };
    const handlePointerDown = () => {
      keyboardNavigationRef.current = false;
    };

    updateHoverCapability();
    window.addEventListener("scroll", handleScroll, { passive: true });
    hoverQuery.addEventListener("change", updateHoverCapability);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      hoverQuery.removeEventListener("change", updateHoverCapability);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  useEffect(() => () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;
      const menu = headerRef.current?.querySelector("#navigation-menu");
      if (
        target instanceof Node &&
        !menu?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [mobileMenuOpen]);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (!canHover) return;
    pointerInsideRef.current = true;
    clearHideTimer();
    setNavVisible(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    pointerInsideRef.current = false;
    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      if (!(keyboardNavigationRef.current && headerRef.current?.contains(document.activeElement))) {
        setNavVisible(false);
        setMobileMenuOpen(false);
      }
    }, 180);
  };

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    if (!pointerInsideRef.current) {
      setNavVisible(false);
      setMobileMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMobileMenuOpen((isOpen) => !isOpen);
    setNavVisible(true);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "credentials", label: "Credentials", href: "#credentials" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const hiddenOnDesktop = canHover && !navVisible;
  const navTabIndex = hiddenOnDesktop ? -1 : 0;

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => setNavVisible(true)}
      onBlurCapture={handleBlurCapture}
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <button
        type="button"
        className="nav-hover-trigger pointer-events-auto"
        aria-label="Show navigation"
        aria-controls="site-navigation"
        aria-expanded={navVisible}
        onFocus={() => setNavVisible(true)}
        onClick={() => setNavVisible(true)}
      />

      <motion.nav
        id="site-navigation"
        aria-label="Main navigation"
        aria-hidden={hiddenOnDesktop}
        className={`nav-shell pointer-events-auto relative z-10 w-full max-w-6xl rounded-full border px-3 sm:px-5 ${
          scrolled ? "py-2" : "py-2.5"
        } ${navVisible ? "nav-visible" : "nav-hidden"}`}
        initial={false}
      >
        <div className="nav-content flex min-h-9 items-center justify-between">
          <div className="nav-brand flex min-w-0 items-center gap-2.5">
            <span className="nav-status-indicator shrink-0" aria-hidden="true" />
            <span className="nav-brand-copy flex min-w-0 flex-col justify-center">
              <span className="nav-brand-name whitespace-nowrap text-[15px] font-semibold tracking-[0.01em]">
                Bhavesh Suthar
              </span>
              <span className="nav-brand-subtitle whitespace-nowrap text-[10px] font-medium tracking-[0.055em]">
                DATA ANALYST · ASPIRING DATA SCIENTIST
              </span>
            </span>
          </div>

          <div className="nav-actions ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5">
            <a
              href="/bhavesh-suthar-resume.txt"
              download="Bhavesh-Suthar-Resume.txt"
              tabIndex={navTabIndex}
              className="nav-resume-button rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.13em] sm:px-3.5"
              onMouseEnter={() => onCursorChange("RESUME")}
              onMouseLeave={() => onCursorChange("")}
            >
              RESUME
            </a>

            <motion.button
              ref={menuButtonRef}
              type="button"
              className="nav-grid-button inline-flex size-9 items-center justify-center rounded-full border"
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="navigation-menu"
              tabIndex={navTabIndex}
              onMouseEnter={() => onCursorChange("MENU")}
              onMouseLeave={() => onCursorChange("")}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.16 }}
            >
              {mobileMenuOpen ? <X size={17} strokeWidth={1.8} /> : <LayoutGrid size={17} strokeWidth={1.8} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="navigation-menu"
              className="nav-dropdown pointer-events-auto absolute right-0 top-full z-[60] mt-3 w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl border p-2.5"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={closeMenu}
                    className="nav-menu-link flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-medium"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-[#38BDF8]">→</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
