"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Sermons", path: "/sermons" },
    { name: "Ministries", path: "/ministries" },
    { name: "Devotions", path: "/devotions" },
    { name: "Events", path: "/events" },
    { name: "Giving", path: "/giving" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/images/churchlogo1.png"
                alt="churchlogo1.png"
                width={40}
                height={40}
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-lg text-gray-900 leading-tight">
                Kingdom Restoration Church
              </div>
              <div className="text-xs text-blue-500 tracking-wide">
                Restoration Embassy Kisumu
              </div>
            </div>
            <div className="sm:hidden">
              <div className="font-semibold text-base text-gray-900">KRC</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-red-700"
                    : "text-gray-700 hover:text-red-700"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[29px] left-0 right-0 h-1 bg-red-700"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Give Now Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/giving"
              className="px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all hover:shadow-lg hover:shadow-red-700/30 font-medium"
            >
              Give Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-red-700 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-red-700"
                      : "text-gray-700 hover:text-red-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/giving"
                onClick={() => setIsOpen(false)}
                className="block w-full px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all text-center font-medium"
              >
                Give Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
