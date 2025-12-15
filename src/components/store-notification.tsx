"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Store } from "lucide-react";
import Link from "next/link";

type NotificationProps = {
  lang?: "en" | "ar";
};

const translations = {
  en: {
    badge: "New",
    title: "Now Available on Microsoft Store!",
    subtitle: "Download EchoWave directly from the official Microsoft Store",
    dismiss: "Dismiss notification",
  },
  ar: {
    badge: "جديد",
    title: "متاح الآن على متجر مايكروسوفت!",
    subtitle: "حمّل إيكو ويف مباشرة من متجر مايكروسوفت الرسمي",
    dismiss: "إغلاق الإشعار",
  },
};

export function StoreNotification({ lang = "en" }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    // Check if user has dismissed the notification before
    const dismissed = localStorage.getItem("ms-store-notification-dismissed");
    if (!dismissed) {
      // Show notification after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      localStorage.setItem("ms-store-notification-dismissed", "true");
    }, 300);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 left-4 right-4 z-50 sm:left-1/2 sm:right-auto sm:bottom-8 sm:-translate-x-1/2"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <Link
            href="/updates"
            className="relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 p-[1px] shadow-[0_20px_60px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(99,102,241,0.5)]"
          >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-xl animate-pulse" />
            
            <div className="relative flex items-center gap-3 rounded-2xl bg-zinc-950/95 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-4">
              {/* Icon with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-xl bg-indigo-400/20 blur-lg" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 sm:h-10 sm:w-10">
                  <Store className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-300 ring-1 ring-indigo-400/30 sm:px-2.5 sm:text-[10px] ${lang === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}`}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    </span>
                    {t.badge}
                  </span>
                  <h3 className={`truncate text-xs font-semibold text-white sm:text-sm ${lang === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}`}>
                    {t.title}
                  </h3>
                </div>
                <p className={`hidden text-xs text-zinc-400 sm:block ${lang === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}`}>
                  {t.subtitle}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-400 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white sm:h-7 sm:w-7"
                aria-label={t.dismiss}
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>

              {/* Shimmer effect overlay */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["0%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

