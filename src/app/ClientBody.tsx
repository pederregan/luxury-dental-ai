"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigation items for easier management
  const navItems = [
    { label: "Patient Acquisition", href: "/solutions/patient-acquisition" },
    { label: "Clinical Excellence", href: "/solutions/clinical-excellence" },
    { label: "Operational", href: "/solutions/operational-efficiency" },
    { label: "Revenue", href: "/solutions/revenue-optimization" },
    { label: "Platform", href: "/platform" },
    { label: "Results", href: "/results" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Company", href: "/company/about" },
  ];

  return (
    <div>
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#f7f5f2]/80 border-b border-[#1a365d]/10 shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 xl:px-24 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Link href="/" className="text-[#1a365d] tracking-wide group" aria-label="DSM Solutions Home">
              <motion.span
                className="font-[family-name:var(--font-playfair)] text-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                DSM Solutions
              </motion.span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#2d3748]">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <Link
                  href={item.href}
                  className="relative group"
                >
                  <span className="relative z-10 transition-colors duration-200 hover:text-[#1a365d]">
                    {item.label}
                  </span>
                  <motion.span
                    className="absolute inset-x-0 -bottom-1 h-[2px] bg-[#d4af37] opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#roi"
                className="inline-flex items-center rounded-full bg-[#1a365d] text-white px-5 py-2 text-sm transition-all hover:bg-[#152a49] hover:shadow-lg"
              >
                Get Assessment
              </Link>
            </motion.div>
          </motion.div>

          <motion.button
            aria-label="Open Menu"
            className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-[#1a365d]/20"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-5 bg-[#1a365d]"
            />
            <motion.div
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-5 bg-[#1a365d] mt-1"
            />
            <motion.div
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-5 bg-[#1a365d] mt-1"
            />
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden border-t border-[#1a365d]/10 bg-[#f7f5f2]/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="px-6 py-4 grid gap-3 text-[#2d3748]">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="py-2 block hover:text-[#1a365d] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="#roi"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center rounded-full bg-[#1a365d] text-white px-5 py-2 text-sm"
                  >
                    Get Assessment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div>{children}</div>

      <footer className="mt-24 border-t border-[#1a365d]/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 xl:px-24 py-10 grid md:grid-cols-4 gap-6 text-sm text-[#2d3748]/80">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="font-[family-name:var(--font-playfair)] text-[#1a365d] text-lg">DSM Solutions</div>
            <p className="mt-2">Premium dental AI platform delivering measurable practice growth.</p>
          </motion.div>

          {[
            {
              title: "Solutions",
              links: [
                { label: "Patient Acquisition", href: "/solutions/patient-acquisition" },
                { label: "Clinical Excellence", href: "/solutions/clinical-excellence" },
                { label: "Operational Efficiency", href: "/solutions/operational-efficiency" },
                { label: "Revenue Optimization", href: "/solutions/revenue-optimization" },
              ]
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "/company/about" },
                { label: "Results", href: "/results" },
                { label: "Pricing", href: "/pricing" },
              ]
            },
            {
              title: "Platform",
              links: [
                { label: "Platform", href: "/platform" },
                { label: "Resources", href: "/resources" },
              ]
            }
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-[#1a365d] font-medium">{section.title}</div>
              <ul className="mt-2 space-y-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-[#1a365d] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-xs text-[#2d3748]/60 text-center py-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} DSM Solutions. All rights reserved.
        </motion.div>
      </footer>
    </div>
  );
}
