"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setLoading(false);
      return;
    }
    // Only run on client, dismiss after 1.1s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="uxi-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] pointer-events-none"
        >
          {/* Subtle blue center glow */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#2C72B2]/12 via-[#1D68BD]/6 to-transparent blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Letters U X I moving together */}
            <div className="flex items-center text-4xl sm:text-5xl font-extrabold tracking-tight text-[#171717]">
              <motion.span
                initial={{ x: -28, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                U
              </motion.span>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mx-0.5 text-[#2C72B2]"
              >
                X
              </motion.span>
              <motion.span
                initial={{ x: 28, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                i
              </motion.span>
            </div>

            {/* Micro subtle line indicator */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="h-[1.5px] mt-3 bg-gradient-to-r from-[#2C72B2] to-[#1D68BD] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
