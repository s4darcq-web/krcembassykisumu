"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-red-950 via-blue-950 to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <div className="mx-auto w-24 h-24">
            <Image
              src="/images/churchlogo1.png"
              alt="Kingdom Restoration Church logo"
              width={96}
              height={96}
              className="w-24 h-24 object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <h2 className="text-2xl font-semibold text-white">Loading...</h2>
          <p className="text-gray-300 mt-2">Kingdom Restoration Church</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
