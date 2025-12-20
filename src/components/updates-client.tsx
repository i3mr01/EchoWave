"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Sparkles, Download, Settings, Globe, Zap, List, X, RotateCcw, Rocket, FileText, AppWindow, Bell } from "lucide-react";
import { motion } from "framer-motion";

const en = {
  title: "What's New",
  subtitle: "Latest updates, features, and improvements",
  backToHome: "Back to Home",
  version: "Version",
  released: "Released",
  majorFeatures: "Major Features",
  downloadManagement: "Download Management",

  qualityEngine: "Max Quality Engine",
  qualityDesc: "Automatically selects the absolute best video/audio streams (including VP9/Opus) for crystal clear results.",
  deduplication: "Smart Duplicate Detection",
  deduplicationDesc: "Prevents re-downloading files you already have to save bandwidth and storage.",
  batchQueue: "Batch Queueing",
  batchQueueDesc: "Paste multiple links in succession and let EchoWave handle the queue automatically.",
  diagnostics: "Self-Healing Diagnostics",
  diagnosticsDesc: "New optional diagnostic system helps identify and fix issues faster than ever.",
  net8: "Powered by .NET 8",
  net8Desc: "Major internal upgrade for faster startup times, smaller footprint, and smoother responsiveness.",

  // v1.5.2
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
  perfectInstaller: "Microsoft Store Release (Preview)",
  installerDesc: "EchoWave is now available on the official Microsoft Store for easier installation and automatic updates.",
  appIconFix: "App Icon Fix",
  iconFixDesc: "Solved the issue where the logo wasn't showing on the Taskbar or Desktop shortcuts.",
  downloadNotifications: "Download Notifications",
  notificationsDesc: "Get notified when your downloads are complete, so you never miss a beat.",
  fullArabic: "Full Arabic Support",
  arabicDesc: "All new features (Retry, Updates, etc.) are fully translated.",
  rtlFixes: "RTL Layout Fixes",
  rtlDesc: "Fixed indentation and layout for \"Playlist Videos\" in Arabic mode.",
  uiImprovements: "UI & UX Improvements",
  localization: "Localization",
};

const ar = {
  title: "ما الجديد",
  subtitle: "أحدث التحديثات والميزات والتحسينات",
  backToHome: "العودة للصفحة الرئيسية",
  version: "الإصدار",
  released: "تاريخ الإصدار",
  majorFeatures: "الميزات الرئيسية",
  downloadManagement: "إدارة التنزيلات",

  qualityEngine: "محرك الجودة القصوى",
  qualityDesc: "يختار تلقائياً أفضل جودة فيديو/صوت متاحة (بما في ذلك VP9/Opus) لنتائج فائقة الوضوح.",
  deduplication: "كشف التكرار الذكي",
  deduplicationDesc: "يمنع إعادة تنزيل الملفات الموجودة مسبقاً لتوفير البيانات ومساحة التخزين.",
  batchQueue: "طابور التنزيل الجماعي",
  batchQueueDesc: "الصق روابط متعددة بالتتابع واترك إيكو ويف يدير الطابور تلقائياً.",
  diagnostics: "تشخيص ذاتي وإصلاح",
  diagnosticsDesc: "نظام تشخيص اختياري جديد يساعد في تحديد المشاكل وإصلاحها بشكل أسرع من أي وقت مضى.",
  net8: "مدعوم بـ .NET 8",
  net8Desc: "ترقية داخلية كبيرة لسرعة تشغيل أعلى، استهلاك أقل، واستجابة أكثر سلاسة.",

  // v1.5.2
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
  perfectInstaller: "إصدار متجر مايكروسوفت",
  installerDesc: "إيكو ويف متاح الآن على متجر مايكروسوفت الرسمي لتثبيت أسهل وتحديثات تلقائية.",
  appIconFix: "إصلاح أيقونة التطبيق",
  iconFixDesc: "تم حل مشكلة عدم ظهور الشعار في شريط المهام أو اختصارات سطح المكتب.",
  downloadNotifications: "إشعارات التنزيل",
  notificationsDesc: "احصل على إشعار عند اكتمال التنزيلات، لتبقى على اطلاع دائم.",
  fullArabic: "دعم كامل للعربية",
  arabicDesc: "جميع الميزات الجديدة (إعادة المحاولة، التحديثات، إلخ) مترجمة بالكامل.",
  rtlFixes: "إصلاحات تخطيط RTL",
  rtlDesc: "تم إصلاح المسافات البادئة والتخطيط لـ \"فيديوهات قائمة التشغيل\" في الوضع العربي.",
  uiImprovements: "تحسينات الواجهة والتجربة",
  localization: "الترجمة",
};

type FeatureItem = {
  icon: React.ReactNode;
  titleKey: keyof typeof en;
  descKey: keyof typeof en;
  category: "major" | "download" | "ui" | "localization";
};

const features_1_6: FeatureItem[] = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    titleKey: "qualityEngine",
    descKey: "qualityDesc",
    category: "major",
  },
  {
    icon: <List className="h-5 w-5" />,
    titleKey: "batchQueue",
    descKey: "batchQueueDesc",
    category: "major",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    titleKey: "net8",
    descKey: "net8Desc",
    category: "major",
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    titleKey: "deduplication",
    descKey: "deduplicationDesc",
    category: "download",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    titleKey: "diagnostics",
    descKey: "diagnosticsDesc",
    category: "ui",
  },
];

const features_1_5: FeatureItem[] = [
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
  
  // v1.6.0 Grouping
  const majorFeatures16 = features_1_6.filter((f) => f.category === "major");
  const downloadFeatures16 = features_1_6.filter((f) => f.category === "download");
  const uiFeatures16 = features_1_6.filter((f) => f.category === "ui");

  // v1.5.2 Grouping
  const majorFeatures15 = features_1_5.filter((f) => f.category === "major");
  const downloadFeatures15 = features_1_5.filter((f) => f.category === "download");
  const uiFeatures15 = features_1_5.filter((f) => f.category === "ui");
  const locFeatures15 = features_1_5.filter((f) => f.category === "localization");

  return (
    <main className="echowave-shell relative overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.08),transparent_50%)]" />
      </div>

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

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-10 flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900/40 px-3 py-2 text-sm text-zinc-300 ring-1 ring-white/5 transition-all hover:bg-zinc-900/60 hover:text-zinc-50 hover:ring-white/10"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToHome}
          </Link>
        </motion.header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-zinc-950/95 p-8 shadow-2xl sm:p-12"
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
          
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Latest Release
            </div>
            
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {t.version} <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">1.6</span>
            </h1>
            
            <p className="max-w-2xl text-lg text-zinc-300">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Major Features 1.6 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <h3 className="text-xl font-bold text-zinc-50">
              {t.majorFeatures}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {majorFeatures16.map((feature, idx) => (
              <div
                key={feature.titleKey}
                className="group relative overflow-hidden rounded-xl border border-indigo-500/20 bg-zinc-950/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/40 hover:bg-zinc-900/80"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h4 className="mb-1.5 text-sm font-bold text-zinc-50">
                  {t[feature.titleKey]}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {t[feature.descKey]}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Other Features 1.6 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-16"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {[...downloadFeatures16, ...uiFeatures16].map((feature, idx) => (
              <div
                key={feature.titleKey}
                className="group relative overflow-hidden rounded-xl border border-sky-500/20 bg-zinc-950/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/40 hover:bg-zinc-900/80"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/30 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h4 className="mb-1.5 text-sm font-bold text-zinc-50">
                  {t[feature.titleKey]}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {t[feature.descKey]}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* --- DIVIDER for 1.5.2 --- */}
        <div className="mb-12 flex items-center justify-center gap-4 opacity-50">
           <div className="h-px w-24 bg-zinc-700"></div>
           <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">v1.5.2</span>
           <div className="h-px w-24 bg-zinc-700"></div>
        </div>

        {/* Major Features 1.5 */}
        <div className="mb-12">
            {/* Reusing Major Features Style but static */}
          <div className="mb-6 flex items-center gap-3 opacity-80">
            <h3 className="text-lg font-bold text-zinc-400">
              {t.majorFeatures}
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {majorFeatures15.map((feature, idx) => (
              <div
                key={feature.titleKey}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-zinc-900/60"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 ring-1 ring-zinc-700/50 group-hover:text-indigo-300 group-hover:ring-indigo-500/30">
                  {feature.icon}
                </div>
                <h4 className="mb-1.5 text-sm font-bold text-zinc-400 group-hover:text-zinc-200">
                  {t[feature.titleKey]}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                  {t[feature.descKey]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Features 1.5 */}
        <div className="mb-12">
           <div className="mb-6 flex items-center gap-3 opacity-80">
             <h3 className="text-lg font-bold text-zinc-400">{t.downloadManagement}</h3>
           </div>
           <div className="grid gap-3 sm:grid-cols-3 opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100">
             {downloadFeatures15.map((feature) => (
                <div key={feature.titleKey} className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40 p-5 hover:border-sky-500/20">
                   <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 ring-1 ring-zinc-700/50 group-hover:text-sky-300 group-hover:ring-sky-500/30">
                     {feature.icon}
                   </div>
                   <h4 className="mb-1 text-sm font-bold text-zinc-400 group-hover:text-zinc-200">{t[feature.titleKey]}</h4>
                   <p className="text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-400">{t[feature.descKey]}</p>
                </div>
             ))}
           </div>
        </div>
        
        {/* UI & Loc Features 1.5 */}
        <div className="mb-12">
             <div className="mb-6 flex items-center gap-3 opacity-80">
                 <h3 className="text-lg font-bold text-zinc-400">{t.uiImprovements}</h3>
             </div>
             <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                 {[...uiFeatures15, ...locFeatures15].map((feature) => (
                     <div key={feature.titleKey} className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40 p-5 hover:border-emerald-500/20">
                         <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 ring-1 ring-zinc-700/50 group-hover:text-emerald-300 group-hover:ring-emerald-500/30">
                             {feature.icon}
                         </div>
                         <h4 className="mb-1 text-sm font-bold text-zinc-400 group-hover:text-zinc-200">{t[feature.titleKey]}</h4>
                         <p className="text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-400">{t[feature.descKey]}</p>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </main>
  );
}

