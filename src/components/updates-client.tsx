"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Sparkles, Download, Settings, Globe, Zap, List, X, RotateCcw, Rocket, FileText, AppWindow, Bell } from "lucide-react";
import { motion } from "framer-motion";

const staggerParent = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
} as const;

const en = {
  title: "What's New",
  subtitle: "Latest updates, features, and improvements",
  backToHome: "Back to Home",
  version: "Version",
  released: "Released",
  majorFeatures: "Major Features",
  downloadManagement: "Download Management",
  uiImprovements: "UI & UX Improvements",
  localization: "Localization",
  spotifySupport: "Spotify Support",
  spotifyDesc: "Download tracks directly from Spotify links with high-quality metadata and cover art.",
  playlistDownloads: "Playlist Downloads",
  playlistDesc: "Download entire playlists from YouTube or Spotify in a single click.",
  autoUpdater: "Auto-Updater",
  autoUpdaterDesc: "The app now checks for updates automatically and allows you to update directly from Settings.",
  smartChangelog: "Smart Changelog",
  smartChangelogDesc: "Automatically opens the \"What's New\" page after an update.",
  retryButton: "Retry Button",
  retryDesc: "Easily retry failed or interrupted downloads.",
  cancelAll: "Cancel All",
  cancelAllDesc: "A new button appears when multiple downloads are active.",
  clearHistory: "Clear History",
  clearHistoryDesc: "Quickly remove completed downloads from the list.",
  settingsRedesign: "Settings Redesign",
  settingsDesc: "A completely new, cleaner, and more organized Settings UI.",
  perfectInstaller: "Perfect Installer",
  installerDesc: "New installer (v1.5) that runs as Admin, fixes uninstallation issues, and properly registers the app.",
  appIconFix: "App Icon Fix",
  iconFixDesc: "Solved the issue where the logo wasn't showing on the Taskbar or Desktop shortcuts.",
  downloadNotifications: "Download Notifications",
  notificationsDesc: "Get notified when your downloads are complete, so you never miss a beat.",
  fullArabic: "Full Arabic Support",
  arabicDesc: "All new features (Retry, Updates, etc.) are fully translated.",
  rtlFixes: "RTL Layout Fixes",
  rtlDesc: "Fixed indentation and layout for \"Playlist Videos\" in Arabic mode.",
};

const ar = {
  title: "ما الجديد",
  subtitle: "أحدث التحديثات والميزات والتحسينات",
  backToHome: "العودة للصفحة الرئيسية",
  version: "الإصدار",
  released: "تاريخ الإصدار",
  majorFeatures: "الميزات الرئيسية",
  downloadManagement: "إدارة التنزيلات",
  uiImprovements: "تحسينات الواجهة والتجربة",
  localization: "الترجمة",
  spotifySupport: "دعم سبوتيفاي",
  spotifyDesc: "حمّل الأغاني مباشرة من روابط سبوتيفاي مع بيانات وصفية عالية الجودة وأغلفة الألبومات.",
  playlistDownloads: "تنزيل قوائم التشغيل",
  playlistDesc: "حمّل قوائم تشغيل كاملة من يوتيوب أو سبوتيفاي بنقرة واحدة.",
  autoUpdater: "التحديث التلقائي",
  autoUpdaterDesc: "التطبيق يتحقق الآن من التحديثات تلقائياً ويتيح لك التحديث مباشرة من الإعدادات.",
  smartChangelog: "سجل التغييرات الذكي",
  smartChangelogDesc: "يفتح صفحة \"ما الجديد\" تلقائياً بعد التحديث.",
  retryButton: "زر إعادة المحاولة",
  retryDesc: "أعد المحاولة بسهولة للتنزيلات الفاشلة أو المتقطعة.",
  cancelAll: "إلغاء الكل",
  cancelAllDesc: "يظهر زر جديد عند وجود عدة تنزيلات نشطة.",
  clearHistory: "مسح السجل",
  clearHistoryDesc: "أزل التنزيلات المكتملة من القائمة بسرعة.",
  settingsRedesign: "إعادة تصميم الإعدادات",
  settingsDesc: "واجهة إعدادات جديدة تماماً، أنظف وأكثر تنظيماً.",
  perfectInstaller: "مثبت مثالي",
  installerDesc: "مثبت جديد (v1.5) يعمل كمسؤول، يصلح مشاكل إلغاء التثبيت ويسجل التطبيق بشكل صحيح.",
  appIconFix: "إصلاح أيقونة التطبيق",
  iconFixDesc: "تم حل مشكلة عدم ظهور الشعار في شريط المهام أو اختصارات سطح المكتب.",
  downloadNotifications: "إشعارات التنزيل",
  notificationsDesc: "احصل على إشعار عند اكتمال التنزيلات، لتبقى على اطلاع دائم.",
  fullArabic: "دعم كامل للعربية",
  arabicDesc: "جميع الميزات الجديدة (إعادة المحاولة، التحديثات، إلخ) مترجمة بالكامل.",
  rtlFixes: "إصلاحات تخطيط RTL",
  rtlDesc: "تم إصلاح المسافات البادئة والتخطيط لـ \"فيديوهات قائمة التشغيل\" في الوضع العربي.",
};

type FeatureItem = {
  icon: React.ReactNode;
  titleKey: keyof typeof en;
  descKey: keyof typeof en;
  category: "major" | "download" | "ui" | "localization";
};

const features: FeatureItem[] = [
  {
    icon: <Download className="h-5 w-5" />,
    titleKey: "spotifySupport",
    descKey: "spotifyDesc",
    category: "major",
  },
  {
    icon: <List className="h-5 w-5" />,
    titleKey: "playlistDownloads",
    descKey: "playlistDesc",
    category: "major",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    titleKey: "autoUpdater",
    descKey: "autoUpdaterDesc",
    category: "major",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    titleKey: "smartChangelog",
    descKey: "smartChangelogDesc",
    category: "major",
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    titleKey: "retryButton",
    descKey: "retryDesc",
    category: "download",
  },
  {
    icon: <X className="h-5 w-5" />,
    titleKey: "cancelAll",
    descKey: "cancelAllDesc",
    category: "download",
  },
  {
    icon: <List className="h-5 w-5" />,
    titleKey: "clearHistory",
    descKey: "clearHistoryDesc",
    category: "download",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    titleKey: "settingsRedesign",
    descKey: "settingsDesc",
    category: "ui",
  },
  {
    icon: <Download className="h-5 w-5" />,
    titleKey: "perfectInstaller",
    descKey: "installerDesc",
    category: "ui",
  },
  {
    icon: <AppWindow className="h-5 w-5" />,
    titleKey: "appIconFix",
    descKey: "iconFixDesc",
    category: "ui",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    titleKey: "downloadNotifications",
    descKey: "notificationsDesc",
    category: "ui",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    titleKey: "fullArabic",
    descKey: "arabicDesc",
    category: "localization",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    titleKey: "rtlFixes",
    descKey: "rtlDesc",
    category: "localization",
  },
];

export function UpdatesClient() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const t = lang === "en" ? en : ar;
  const isArabic = lang === "ar";

  const majorFeatures = features.filter((f) => f.category === "major");
  const downloadFeatures = features.filter((f) => f.category === "download");
  const uiFeatures = features.filter((f) => f.category === "ui");
  const localizationFeatures = features.filter((f) => f.category === "localization");

  return (
    <main className="echowave-shell" dir={isArabic ? "rtl" : "ltr"}>
      {/* Floating language switcher */}
      <div className="fixed right-4 top-4 z-30 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className="group flex items-center gap-2 rounded-full border border-white/5 bg-zinc-900/50 pl-2 pr-3 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl transition-all hover:border-white/10 hover:bg-zinc-900/80 hover:text-zinc-100"
          aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
            <Globe className="h-3 w-3" />
          </div>
          <span className={lang === "en" ? "font-[family-name:var(--font-arabic)]" : "font-sans"}>
            {lang === "en" ? "العربية" : "English"}
          </span>
        </button>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-gradient absolute inset-0 opacity-90" />
          <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/25 via-sky-400/20 to-transparent blur-3xl" />
          <div className="absolute -right-32 top-64 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500/25 via-emerald-400/10 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToHome}
          </Link>
        </motion.header>

        {/* Title */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mb-12 space-y-3"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            {t.title}
          </h1>
          <p className="text-sm text-zinc-400 sm:text-base">{t.subtitle}</p>
        </motion.div>

        {/* Version Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-surface soft-shadow mb-8 overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-zinc-950/95 to-black/95 p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 ring-1 ring-zinc-800">
                  <Rocket className="h-5 w-5 text-zinc-100" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50 sm:text-2xl">
                    {t.version} 1.5.1.0
                  </h2>
                  <p className="text-xs text-zinc-400">{t.released}</p>
                </div>
              </div>
            </div>
            <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
              Latest
            </div>
          </div>
        </motion.div>

        {/* Major Features */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mb-10"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-50">
            <div className="h-1 w-1 rounded-full bg-indigo-400" />
            {t.majorFeatures}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {majorFeatures.map((feature, idx) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-4 ring-1 ring-black/40 transition hover:border-indigo-500/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-12 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/35 via-sky-400/20 to-transparent blur-2xl" />
                </div>
                <div className="relative flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-50">
                      {t[feature.titleKey]}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {t[feature.descKey]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Download Management */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mb-10"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-50">
            <div className="h-1 w-1 rounded-full bg-sky-400" />
            {t.downloadManagement}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {downloadFeatures.map((feature, idx) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-4 ring-1 ring-black/40 transition hover:border-sky-500/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-12 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-sky-400/35 via-emerald-400/20 to-transparent blur-2xl" />
                </div>
                <div className="relative flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/30">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-50">
                      {t[feature.titleKey]}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {t[feature.descKey]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* UI Improvements */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mb-10"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-50">
            <div className="h-1 w-1 rounded-full bg-emerald-400" />
            {t.uiImprovements}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {uiFeatures.map((feature, idx) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-4 ring-1 ring-black/40 transition hover:border-emerald-500/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-12 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/35 via-indigo-400/20 to-transparent blur-2xl" />
                </div>
                <div className="relative flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-50">
                      {t[feature.titleKey]}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {t[feature.descKey]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Localization */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mb-10"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-50">
            <div className="h-1 w-1 rounded-full bg-purple-400" />
            {t.localization}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {localizationFeatures.map((feature, idx) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-4 ring-1 ring-black/40 transition hover:border-purple-500/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-12 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400/35 via-pink-400/20 to-transparent blur-2xl" />
                </div>
                <div className="relative flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/30">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-50">
                      {t[feature.titleKey]}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {t[feature.descKey]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}

