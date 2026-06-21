"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check session storage to only show once per browser session
    const hasSeenSplash = sessionStorage.getItem("splashShown");

    if (!hasSeenSplash) {
      setShow(true);

      // Trigger festive confetti from both sides
      const duration = 4500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#881A2D", "#D4AF37", "#72B76A"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#881A2D", "#D4AF37", "#72B76A"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Hide after 5 seconds and set session storage
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("splashShown", "true");
      }, 5500);

      return () => clearTimeout(timer);
    } else {
      // Ensure the temp splash is removed if they somehow bypassed the check
      const tempSplash = document.getElementById('temp-splash-cover');
      if (tempSplash) {
        tempSplash.remove();
      }
    }
  }, []);

  // Prevent scrolling while splash is active and remove temp cover once rendered
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";

      // The real splash screen is now in the DOM. Safely remove the temp white cover.
      const tempSplash = document.getElementById('temp-splash-cover');
      if (tempSplash) {
        // Small delay to ensure the video has started painting
        setTimeout(() => tempSplash.remove(), 50);
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center px-4 -mt-10 overflow-hidden"
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-[-2]"
          >
            <source src="/images/bg-video.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure the colored text and logo remain readable */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-[-1]"></div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <Image
              src="/images/logo.png"
              alt="Rojgari India Logo"
              width={450}
              height={140}
              priority
              unoptimized
              className="mx-auto h-auto w-[250px] md:w-[300px]"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-5xl fontAL font-bold text-[#72B76A] mb-4 mt-10 tracking-wider"
          >
            26<sup>th</sup> ANNIVERSARY
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-md md:text-xl fontPOP text-slate-600 italic mb-8"

          >
            Celebrating 26 years of trust, growth, and opportunities.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-lg md:text-2xl fontPOP text-slate-800 mb-2 font-medium max-w-2xl"

          >
            Now, that belief becomes something bigger.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="inline-block border-2 border-b-[#72B76A] border-l-0 border-r-0 border-t-0 text-[#72B76A] mt-5 px-8 py-3 fontPOP font-semibold text-lg md:text-xl border border-[#881A2D]/20"
          >
            15 June 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
