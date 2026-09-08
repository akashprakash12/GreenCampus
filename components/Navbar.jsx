"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Leaf, Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Initiatives", href: "#initiatives" },
  { name: "Events", href: "#events" },
  { name: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(8,44,32,0.92)"
            : "rgba(8,44,32,0.55)",
        }}
        transition={{ duration: 0.3 }}
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 md:px-6 ${
          scrolled
            ? "border-white/15 shadow-black/20"
            : "border-white/10"
        }`}
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#f1ead4]">
            <Image
              src="/images/college-logo.png"
              alt="College logo"
              fill
              priority
              sizes="44px"
              className="object-contain p-1"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-cormorant)] text-xl font-semibold leading-none text-[#f1ead4]">
              Green Campus
            </p>

            <p className="mt-1 hidden truncate text-[9px] uppercase tracking-[0.18em] text-[#a8bd8f] sm:block">
              IHRD Government Polytechnic
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-2 text-sm text-[#d7dbc9] transition hover:text-white"
            >
              {link.name}

              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#a8bd8f] transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="nav-contact-button hidden rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 lg:block"
        >
          Get Involved
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f1ead4] transition hover:bg-white/10 lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-[#082c20]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col">
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/10 px-3 py-4 text-lg text-[#d7dbc9] transition hover:pl-5 hover:text-white"
                  >
                    {link.name}
                  </motion.a>
                ))}

                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="nav-contact-button mt-5 rounded-full px-5 py-3.5 text-center font-medium"
                >
                  Get Involved
                </a>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#829d88]">
                <Leaf size={14} />
                Building a sustainable campus
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}