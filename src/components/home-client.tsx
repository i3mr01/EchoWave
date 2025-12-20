"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  MonitorSmartphone, 
  Shield, 
  Rocket, 
  Globe, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Circle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { EchoWaveBuild } from "@/lib/get-latest-build";
import { StoreNotification } from "@/components/store-notification";
import img1 from "../../Resources/1.png";
import img2 from "../../Resources/2.png";
import img3 from "../../Resources/3.png";
import img4 from "../../Resources/4.png";

const screenshots = [img1, img2, img3, img4];

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
};

type Props = {
  latest: EchoWaveBuild | null;
};

export function HomeClient({ latest }: Props) {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const t = lang === "en" ? en : ar;
  const isArabic = lang === "ar";
  const hostedDownloadUrl =
    process.env.NEXT_PUBLIC_ECHOWAVE_DOWNLOAD_URL || "";
  const hasHostedDownload = hostedDownloadUrl.length > 0;

  useEffect(() => {
    // Re-apply badge properties on mount to fix client-side navigation issues
    const initBadge = () => {
      const badge = document.querySelector('ms-store-badge');
      if (badge) {
        // Explicitly set properties to wake up the component
        badge.setAttribute('theme', 'light');
        badge.setAttribute('animation', 'on');
      }
    };

    // Run immediately
    initBadge();

    // Run slightly delayed to ensure DOM is ready
    const timer = setTimeout(initBadge, 100);
    return () => clearTimeout(timer);
  }, []);

  const nextScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentScreenIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentScreenIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  // Keyboard navigation for zoom mode
  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentScreenIndex((prev) => (prev + 1) % screenshots.length);
      if (e.key === "ArrowLeft") setCurrentScreenIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed]);

  return (
    <main className="echowave-shell" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Store notification */}
      <StoreNotification lang={lang} />
      
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

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        {/* Top nav */}
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
              EchoWave
            </p>
            <p className="text-xs text-zinc-400">
              {t.tagline}
            </p>
          </div>

          <div className="hidden items-center gap-3 text-xs text-zinc-400 sm:flex">
            <span className="rounded-full bg-zinc-900/60 px-3 py-1 ring-1 ring-white/10">
              {t.platformChip}
            </span>
            <Link
              href="https://github.com/i3mr01"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-zinc-900/40 px-3 py-1 ring-1 ring-white/5 text-zinc-300 hover:text-indigo-300"
            >
              {t.byAuthor}
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-stretch">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerParent as any}
            className="space-y-8"
          >
            <motion.div
              variants={staggerParent as any}
              className="inline-flex items-center gap-2 mt-2"
            >
              <Link href="/updates" className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-500/20 transition hover:bg-indigo-500/20 hover:text-indigo-200">
                <Rocket className="h-3 w-3" />
                {isArabic ? "جديد: الإصدار 1.6" : "New: Version 1.6"}
              </Link>
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-300/80">
                {t.heroKicker}
              </span>
            </motion.div>

            <motion.div variants={staggerParent as any} className="space-y-4">
              <h1
                className={`text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl ${
                  isArabic ? "w-full text-right pr-6 leading-relaxed" : "max-w-xl"
                }`}
              >
                {t.heroTitleLine1}
                <span className="block bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-200 bg-clip-text text-transparent">
                  {t.heroTitleEmphasis}
                </span>
              </h1>
              <p className="max-w-lg text-pretty text-sm text-zinc-400 sm:text-base">
                {t.heroBody}
              </p>
            </motion.div>

            <motion.div
              variants={staggerParent as any}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="ms-store-badge-container inline-flex">
                <ms-store-badge
                  productid="9PF3FZJ8ZR73"
                  productname="EchoWave"
                  window-mode="direct"
                  theme="light"
                  size="large"
                  language={lang === "ar" ? "ar-sa" : "en-us"}
                  animation="on"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerParent as any}
              className="flex flex-wrap items-center gap-3 text-xs text-zinc-400"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 px-3 py-1 ring-1 ring-white/5">
                <MonitorSmartphone className="h-3.5 w-3.5 text-zinc-300" />
                <span>{t.chipOs}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 px-3 py-1 ring-1 ring-white/5">
                <Shield className="h-3.5 w-3.5 text-emerald-300" />
                <span>{t.chipNoAds}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero app preview - Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 26, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative mt-6 flex items-center justify-center"
          >
            {/* Gradient-bordered app frame */}
            <div 
              className="group relative w-full max-w-2xl cursor-zoom-in rounded-[1.8rem] bg-gradient-to-tr from-indigo-500/70 via-sky-500/40 to-emerald-400/60 p-[1.5px] shadow-[0_26px_70px_rgba(15,23,42,0.95)] transition-transform active:scale-[0.98]"
              onClick={() => setIsZoomed(true)}
            >
              <div className="relative overflow-hidden rounded-[1.65rem] bg-zinc-950/95 aspect-[16/10]">
                {/* Screenshot */}
                <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentScreenIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={screenshots[currentScreenIndex]}
                        alt="EchoWave desktop app"
                        className="h-full w-full object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Soft inner vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent,transparent_55%,rgba(15,23,42,0.85)_95%)]" />
                </div>
                
                {/* Carousel Controls (visible on hover) */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={prevScreenshot}
                     className="rounded-full bg-black/50 p-1.5 text-white/70 backdrop-blur-md transition hover:bg-black/70 hover:text-white"
                   >
                     <ChevronLeft className="h-5 w-5" />
                   </button>
                   <button 
                     onClick={nextScreenshot}
                     className="rounded-full bg-black/50 p-1.5 text-white/70 backdrop-blur-md transition hover:bg-black/70 hover:text-white"
                   >
                     <ChevronRight className="h-5 w-5" />
                   </button>
                </div>

                {/* Floating label & Dots */}
                <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900/85 px-4 py-1.5 text-[0.7rem] text-zinc-200 ring-1 ring-white/10 backdrop-blur-md">
                  <div className="flex gap-1.5 pointer-events-auto">
                    {screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentScreenIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentScreenIndex 
                            ? "w-4 bg-emerald-400 shadow-[0_0_0_2px_rgba(34,197,94,0.25)]" 
                            : "w-1.5 bg-zinc-600 hover:bg-zinc-500"
                        }`}
                        aria-label={`Go to screenshot ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="pl-2 border-l border-white/10">{t.previewLabel}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mt-20 space-y-8 border-t border-white/5 pt-10 sm:mt-24 sm:pt-12"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                {t.featuresTitle}
              </h2>
              <p className="max-w-xl text-sm text-zinc-400">
                {t.featuresBody}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title={t.feature1Title}
              body={t.feature1Body}
            />
            <FeatureCard
              title={t.feature2Title}
              body={t.feature2Body}
            />
            <FeatureCard
              title={t.feature3Title}
              body={t.feature3Body}
            />
            <FeatureCard
              title={t.feature4Title}
              body={t.feature4Body}
            />
            <FeatureCard
              title={t.feature5Title}
              body={t.feature5Body}
            />
            <FeatureCard
              title={t.feature6Title}
              body={t.feature6Body}
            />
          </div>

          {/* FAQ / Q&A */}
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/5 bg-zinc-950/70 p-5 text-sm text-zinc-300 shadow-[0_20px_50px_rgba(15,23,42,0.85)] sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/80">
                {t.faqKicker}
              </p>
              <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">
                {t.faqTitle}
              </h3>
              <p className="text-xs text-zinc-400 sm:text-sm">
                {t.faqBody}
              </p>
            </div>

            <dl className="space-y-4 text-xs sm:text-sm">
              <div>
                <dt className="font-medium text-zinc-100">{t.faq1Q}</dt>
                <dd className="mt-1 text-zinc-400">{t.faq1A}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-100">{t.faq2Q}</dt>
                <dd className="mt-1 text-zinc-400">{t.faq2A}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-100">{t.faq3Q}</dt>
                <dd className="mt-1 text-zinc-400">{t.faq3A}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Platforms section */}
        <section
          id="download"
          className="mt-20 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/15 via-zinc-950 to-sky-500/10 p-6 sm:mt-24 sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                {t.downloadsSectionTitle}
              </h3>
              <p className="max-w-md text-sm text-zinc-300">
                {t.downloadsSectionBody}
              </p>
            </div>

            <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <PlatformCard
                name={t.platformWindowsName}
                subtitle={t.platformWindowsSubtitle}
                status={latest ? t.platformWindowsStatusAvailable : t.platformWindowsStatusLocal}
                emphasis
              />
              <PlatformCard
                name={t.platformMacName}
                subtitle={t.platformMacSubtitle}
                status={t.platformMacStatus}
              />
              <PlatformCard
                name={t.platformLinuxName}
                subtitle={t.platformLinuxSubtitle}
                status={t.platformLinuxStatus}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Zoom Modal - Carousel Enabled */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              layoutId="app-screenshot"
              className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                       <motion.div
                          key={currentScreenIndex}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="relative"
                       >
                         <Image
                            src={screenshots[currentScreenIndex]}
                            alt="EchoWave desktop app"
                            className="h-auto w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
                            priority
                          />
                       </motion.div>
                    </AnimatePresence>

                     {/* Modal Controls */}
                     <button
                        onClick={prevScreenshot}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 backdrop-blur-md transition hover:bg-black/70 hover:text-white"
                     >
                        <ChevronLeft className="h-8 w-8" />
                     </button>
                     <button
                        onClick={nextScreenshot}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/70 backdrop-blur-md transition hover:bg-black/70 hover:text-white"
                     >
                        <ChevronRight className="h-8 w-8" />
                     </button>

                     {/* Close Button */}
                     <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md transition hover:bg-black/70 hover:text-white z-10"
                     >
                        <X className="h-6 w-6" />
                     </button>

                     {/* Modal Dots */}
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md">
                        {screenshots.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentScreenIndex(idx)}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentScreenIndex 
                                ? "w-6 bg-white" 
                                : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                          />
                        ))}
                     </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

type FeatureCardProps = {
  title: string;
  body: string;
};

function FeatureCard({ title, body }: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-4 ring-1 ring-black/40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-12 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/35 via-sky-400/20 to-transparent blur-2xl" />
      </div>
      <div className="relative space-y-2">
        <h3 className="text-sm font-semibold text-zinc-50">{title}</h3>
        <p className="text-xs text-zinc-400">{body}</p>
      </div>
    </motion.article>
  );
}

type PlatformCardProps = {
  name: string;
  subtitle: string;
  status: string;
  emphasis?: boolean;
};

function PlatformCard({ name, subtitle, status, emphasis }: PlatformCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border px-4 py-3 text-sm ${
        emphasis
          ? "border-indigo-400/70 bg-zinc-950/70 shadow-[0_18px_40px_rgba(55,65,81,0.85)]"
          : "border-zinc-700/60 bg-zinc-950/60"
      }`}
    >
      <div>
        <p className="font-medium text-zinc-50">{name}</p>
        <p className="text-xs text-zinc-400">{subtitle}</p>
      </div>
      <p
        className={`mt-3 text-xs ${
          emphasis ? "text-emerald-300" : "text-zinc-400"
        }`}
      >
        {status}
      </p>
    </div>
  );
}

const en = {
  tagline: "Download video & audio from anywhere",
  platformChip: "Windows • Desktop",
  byAuthor: "by i3mr01",
  heroKicker: "Online, offline, on repeat",
  heroTitleLine1: "Download video & audio",
  heroTitleEmphasis: "from anywhere.",
  heroBody:
    "EchoWave is a sleek Windows app that turns any link into files you own. Paste, choose your quality, and let the waves do the rest.",
  downloadCta: "Download for Windows",
  downloadPending: "Available on MS Store",
  chipOs: "Windows 10 & 11",
  chipNoAds: "No ads, no bloat",
  featuresTitle: "Built for heavy listeners & collectors.",
  featuresBody:
    "EchoWave wraps powerful tooling in a clean interface. No terminals, no ads, just your library - exactly how you like it.",
  feature1Title: "Paste & download",
  feature1Body:
    "Drop in any link from YouTube or Spotify, or paste multiple links at once. EchoWave handles formats, batched queues, and metadata for you.",
  feature2Title: "Smart quality",
  feature2Body:
    "Auto-selects the absolute best 4K/8K quality (now including VP9 & Opus) or lean files for playlists and archives.",
  feature3Title: "Audio-first mode",
  feature3Body:
    "Rip just the audio with embedded thumbnail, metadata, and optional subtitles.",
  feature4Title: "Playlists & Queue",
  feature4Body:
    "Download entire playlists or queues in a click. Smart duplicate detection skips files you already own to save bandwidth.",
  feature5Title: "Auto-Updating",
  feature5Body:
    "Polished Mica-style window, dark theme, and built-in auto-updates with self-healing diagnostics.",
  feature6Title: "Private & local-first",
  feature6Body:
    "History, links, and downloads stay on your machine - no account, no tracking.",
  downloadsSectionTitle: "Downloads",
  downloadsSectionBody:
    "EchoWave is built for Windows. Mac & Linux users can follow the project on GitHub while we explore cross-platform options.",
  platformWindowsName: "Windows",
  platformWindowsSubtitle: "Microsoft Store",
  platformWindowsStatusAvailable: "Available",
  platformWindowsStatusLocal: "Local only",
  platformMacName: "macOS",
  platformMacSubtitle: "Coming later",
  platformMacStatus: "Planned",
  platformLinuxName: "Linux",
  platformLinuxSubtitle: "Coming later",
  platformLinuxStatus: "Planned",
  previewLabel: "EchoWave running on Windows 11",
  faqKicker: "Q&A",
  faqTitle: "What can EchoWave actually download?",
  faqBody:
    "EchoWave can download video and audio from popular platforms like YouTube, Spotify, SoundCloud, TikTok, and Facebook, plus many other video and streaming sites - whether it's a single video or a full playlist.",
  faq1Q: "Can EchoWave download playlists and full albums?",
  faq1A:
    "Yes. Paste a playlist link or multiple individual links. EchoWave queues them all up and handles them in the background, skipping duplicates if you already have them.",
  faq2Q: "What formats and qualities are available?",
  faq2A:
    "EchoWave targets the absolute best quality available, including MP4, WebM (VP9), and MP3/M4A/Opus for audio. It automatically merges video and audio streams for the highest fidelity.",
  faq3Q: "Is EchoWave safe to use?",
  faq3A:
    "EchoWave runs locally on your Windows machine and stores history on your disk only. It includes self-healing diagnostics to keep running smoothly. Always respect terms of service.",
} as const;

const ar = {
  tagline: "حمّل الفيديو والصوت من أي مكان",
  platformChip: "ويندوز • تطبيق سطح مكتب",
  byAuthor: "بواسطة i3mr01",
  heroKicker: "متصل أو بدون إنترنت، دائماً معك",
  heroTitleLine1: "حمّل الفيديو والصوت",
  heroTitleEmphasis: "من أي مكان.",
  heroBody:
    "إيكو ويف هو تطبيق أنيق لويندوز يحوّل أي رابط إلى ملفات تمتلكها للأبد. الصق الرابط، اختر الجودة، ودع الموجات تتكفّل بالباقي.",
  downloadCta: "تنزيل لويندوز",
  downloadPending: "متاح على متجر مايكروسوفت",
  chipOs: "ويندوز 10 و 11",
  chipNoAds: "بدون إعلانات، بدون إزعاج",
  featuresTitle: "مصمَّم لعشّاق الاستماع وجامعي المحتوى.",
  featuresBody:
    "يجمع إيكو ويف بين أدوات قوية وواجهة بسيطة. لا أوامر معقّدة، لا إعلانات، فقط مكتبتك بالشكل الذي تريده.",
  feature1Title: "الصق الرابط وابدأ التنزيل",
  feature1Body:
    "ألصق رابطاً واحداً أو مجموعة روابط دفعة واحدة. إيكو ويف يدير الطابور، التنسيقات، والصور المصغّرة تلقائياً.",
  feature2Title: "جودة ذكية",
  feature2Body:
    "يختار تلقائياً أفضل جودة 4K/8K متاحة (الآن مع دعم VP9/Opus) أو ملفات أخف للأرشفة.",
  feature3Title: "وضع الصوت فقط",
  feature3Body:
    "استخرج الصوت فقط مع تضمين الصورة المصغّرة والبيانات الوصفية والترجمة اختيارياً.",
  feature4Title: "قوائم التشغيل والانتظار",
  feature4Body:
    "حمّل قوائم كاملة بنقرة واحدة. ميزة كشف التكرار الذكي تتخطى الملفات التي تمتلكها مسبقاً لتوفير الإنترنت.",
  feature5Title: "تحديث تلقائي",
  feature5Body:
    "واجهة داكنة بنمط Mica، مع تحديثات تلقائية ونظام تشخيص ذاتي لإصلاح الأعطال.",
  feature6Title: "خصوصية أولاً",
  feature6Body:
    "كل الروابط والسجل والملفات تبقى على جهازك فقط - لا حسابات، لا تتبّع.",
  downloadsSectionTitle: "التنزيلات",
  downloadsSectionBody:
    "إيكو ويف متوفر حالياً لويندوز فقط. مستخدمو macOS و Linux يمكنهم متابعة المشروع بينما نستكشف دعم الأنظمة الأخرى.",
  platformWindowsName: "ويندوز",
  platformWindowsSubtitle: "متجر مايكروسوفت",
  platformWindowsStatusAvailable: "متاح الآن",
  platformWindowsStatusLocal: "متوفر محلياً",
  platformMacName: "macOS",
  platformMacSubtitle: "قريباً",
  platformMacStatus: "مخطَّط له",
  platformLinuxName: "لينكس",
  platformLinuxSubtitle: "قريباً",
  platformLinuxStatus: "مخطَّط له",
  previewLabel: "إيكو ويف يعمل على ويندوز 11",
  faqKicker: "أسئلة وأجوبة",
  faqTitle: "ما الذي يستطيع إيكو ويف تنزيله فعلياً؟",
  faqBody:
    "إيكو ويف يستطيع تنزيل الفيديو والصوت من منصّات شهيرة مثل يوتيوب، سبوتيفاي، ساوندكلاود، تيك توك، وفيسبوك، بالإضافة إلى كثير من مواقع الفيديو والبث الأخرى، سواء كانت فيديوهات منفردة أو قوائم تشغيل كاملة.",
  faq1Q: "هل يمكن لإيكو ويف تنزيل قوائم تشغيل وألبومات كاملة؟",
  faq1A:
    "نعم. ألصق رابط قائمة تشغيل أو عدة روابط فردية. سيقوم إيكو ويف بوضعها في الطابور وإدارتها في الخلفية، مع تخطي التكرارات إذا كنت تمتلك الملفات مسبقاً.",
  faq2Q: "ما هي الصيغ والجودات المتاحة؟",
  faq2A:
    "يستهدف إيكو ويف تلقائياً أفضل جودة متاحة، بما في ذلك MP4 و WebM (VP9) و MP3/M4A/Opus للصوت. يقوم بدمج الفيديو والصوت للحصول على أعلى دقة ممكنة.",
  faq3Q: "هل استخدام إيكو ويف آمن؟",
  faq3A:
    "إيكو ويف يعمل محلياً على جهازك ويخزن السجل على القرص فقط. يتضمن نظام تشخيص ذاتي لضمان العمل بسلاسة. احرص دائماً على احترام شروط الخدمة.",
} as const;
