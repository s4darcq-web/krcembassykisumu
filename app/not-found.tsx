"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-950 via-blue-950 to-gray-900 text-white px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-red-400 to-blue-400">
            404
          </h1>
          <h2 className="text-4xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="px-8 py-4 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <Home className="w-6 h-6" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20 flex items-center gap-3"
            >
              <ArrowLeft className="w-6 h-6" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
