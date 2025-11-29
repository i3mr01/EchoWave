"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Download, MonitorSmartphone, Shield, Rocket, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { EchoWaveBuild } from "@/lib/get-latest-build";
import screenshot from "../../Resources/sc1.png";

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

  const t = lang === "en" ? en : ar;
  const isArabic = lang === "ar";
  const hostedDownloadUrl =
    process.env.NEXT_PUBLIC_ECHOWAVE_DOWNLOAD_URL || "";
  const hasHostedDownload = hostedDownloadUrl.length > 0;

  return (
    <main className="echowave-shell" dir={lang === "ar" ? "rtl" : "ltr"}>
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
                {isArabic ? "جديد: الإصدار 1.5.1" : "New: Version 1.5.1"}
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
              <Button
                asChild
                size="lg"
                className="soft-shadow w-full sm:w-auto"
                disabled={!latest}
                aria-disabled={!latest}
              >
                <a
                  href={
                    hasHostedDownload
                      ? hostedDownloadUrl
                      : latest
                        ? `/api/download?target=${encodeURIComponent(
                            latest.path
                          )}`
                        : "#"
                  }
                >
                  <Download className="h-4 w-4" />
                  {hasHostedDownload
                    ? t.downloadCta
                    : latest
                      ? t.downloadCta
                      : t.downloadPending}
                </a>
              </Button>
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

          {/* Hero app preview */}
          <motion.div
            initial={{ opacity: 0, y: 26, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative mt-6 flex items-center justify-center"
          >
            {/* Gradient-bordered app frame */}
            <div className="relative w-full max-w-xl rounded-[1.8rem] bg-gradient-to-tr from-indigo-500/70 via-sky-500/40 to-emerald-400/60 p-[1.5px] shadow-[0_26px_70px_rgba(15,23,42,0.95)]">
              <div className="relative overflow-hidden rounded-[1.65rem] bg-zinc-950/95">
                {/* Screenshot, original proportions (no crop) */}
                <div className="relative w-full">
                  <Image
                    src={screenshot}
                    alt="EchoWave desktop app"
                    className="h-auto w-full object-contain"
                    priority
                  />

                  {/* Soft inner vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent,transparent_55%,rgba(15,23,42,0.85)_95%)]" />
                </div>

                {/* Floating label */}
                <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-zinc-900/85 px-4 py-1.5 text-[0.7rem] text-zinc-200 ring-1 ring-white/10 backdrop-blur-md">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
                  <span>{t.previewLabel}</span>
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
  downloadPending: "Preparing installer…",
  chipOs: "Windows 10 & 11",
  chipNoAds: "No ads, no bloat",
  featuresTitle: "Built for heavy listeners & collectors.",
  featuresBody:
    "EchoWave wraps powerful tooling in a clean interface. No terminals, no ads, just your library – exactly how you like it.",
  feature1Title: "Paste & download",
  feature1Body:
    "Drop in any link from YouTube or Spotify, and EchoWave analyzes formats, thumbnails, and metadata for you.",
  feature2Title: "Smart quality",
  feature2Body:
    "Choose best available 4K/8K, Full HD, or lean files for playlists and archives.",
  feature3Title: "Audio-first mode",
  feature3Body:
    "Rip just the audio with embedded thumbnail, metadata, and optional subtitles.",
  feature4Title: "Playlists & Queue",
  feature4Body:
    "Download entire playlists from YouTube or Spotify in a single click, with a persistent history.",
  feature5Title: "Auto-Updating",
  feature5Body:
    "Polished Mica-style window, dark theme, and built-in auto-updates so you're always on the latest version.",
  feature6Title: "Private & local-first",
  feature6Body:
    "History, links, and downloads stay on your machine – no account, no tracking.",
  downloadsSectionTitle: "Downloads",
  downloadsSectionBody:
    "EchoWave is built for Windows. Mac & Linux users can follow the project on GitHub while we explore cross-platform options.",
  platformWindowsName: "Windows",
  platformWindowsSubtitle: "Installer",
  platformWindowsStatusAvailable: "Available",
  platformWindowsStatusLocal: "Local only",
  platformMacName: "macOS",
  platformMacSubtitle: "Coming later",
  platformMacStatus: "Planned",
  platformLinuxName: "Linux",
  platformLinuxSubtitle: "DIY builds",
  platformLinuxStatus: "Community",
  previewLabel: "EchoWave running on Windows 11",
  faqKicker: "Q&A",
  faqTitle: "What can EchoWave actually download?",
  faqBody:
    "EchoWave can download video and audio from popular platforms like YouTube, Spotify, SoundCloud, TikTok, and Facebook, plus many other video and streaming sites – whether it’s a single video or a full playlist.",
  faq1Q: "Can EchoWave download playlists and full albums?",
  faq1A:
    "Yes. Paste a playlist link from YouTube or Spotify and EchoWave can queue multiple videos or tracks at once, using your chosen quality and format.",
  faq2Q: "What formats and qualities are available?",
  faq2A:
    "You can target best available 4K/8K where supported, standard HD options, or lighter files. For audio you can grab high-quality formats suitable for music libraries.",
  faq3Q: "Is EchoWave safe to use?",
  faq3A:
    "EchoWave runs locally on your Windows machine and stores history on your disk only. Always respect the terms of service and copyright rules for the sites you use.",
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
  downloadPending: "يتم تجهيز ملف التثبيت…",
  chipOs: "ويندوز 10 و 11",
  chipNoAds: "بدون إعلانات، بدون إزعاج",
  featuresTitle: "مصمَّم لعشّاق الاستماع وجامعي المحتوى.",
  featuresBody:
    "يجمع إيكو ويف بين أدوات قوية وواجهة بسيطة. لا أوامر معقّدة، لا إعلانات، فقط مكتبتك بالشكل الذي تريده.",
  feature1Title: "الصق الرابط وابدأ التنزيل",
  feature1Body:
    "ألصق أي رابط من يوتيوب أو سبوتيفاي وسيقوم إيكو ويف بتحليل الجودة، التنسيقات، والصورة المصغّرة من أجلك.",
  feature2Title: "جودة ذكية",
  feature2Body:
    "اختر أفضل جودة متاحة 4K/8K أو دقّة أقل للقوائم الطويلة والتحميل السريع.",
  feature3Title: "وضع الصوت فقط",
  feature3Body:
    "استخرج الصوت فقط مع تضمين الصورة المصغّرة والبيانات الوصفية والترجمة اختيارياً.",
  feature4Title: "قوائم التشغيل وقائمة الانتظار",
  feature4Body:
    "حمّل قوائم تشغيل كاملة من يوتيوب أو سبوتيفاي بنقرة واحدة، مع سجل دائم لكل ما قمت بتنزيله.",
  feature5Title: "تحديث تلقائي وتصميم عصري",
  feature5Body:
    "واجهة داكنة بنمط Mica مع ميزة التحديث التلقائي لتبقى دائماً على أحدث إصدار.",
  feature6Title: "خصوصية أولاً",
  feature6Body:
    "كل الروابط والسجل والملفات تبقى على جهازك فقط - لا حسابات، لا تتبّع.",
  downloadsSectionTitle: "التنزيلات",
  downloadsSectionBody:
    "إيكو ويف متوفر حالياً لويندوز فقط. مستخدمو macOS و Linux يمكنهم متابعة المشروع بينما نستكشف دعم الأنظمة الأخرى.",
  platformWindowsName: "ويندوز",
  platformWindowsSubtitle: "ملف التثبيت",
  platformWindowsStatusAvailable: "متاح الآن",
  platformWindowsStatusLocal: "متوفر محلياً",
  platformMacName: "macOS",
  platformMacSubtitle: "قريباً",
  platformMacStatus: "مخطَّط له",
  platformLinuxName: "لينكس",
  platformLinuxSubtitle: "بناء يدوي",
  platformLinuxStatus: "مجتمع المطورين",
  previewLabel: "إيكو ويف يعمل على ويندوز 11",
  faqKicker: "أسئلة وأجوبة",
  faqTitle: "ما الذي يستطيع إيكو ويف تنزيله فعلياً؟",
  faqBody:
    "إيكو ويف يستطيع تنزيل الفيديو والصوت من منصّات شهيرة مثل يوتيوب، سبوتيفاي، ساوندكلاود، تيك توك، وفيسبوك، بالإضافة إلى كثير من مواقع الفيديو والبث الأخرى، سواء كانت فيديوهات منفردة أو قوائم تشغيل كاملة.",
  faq1Q: "هل يمكن لإيكو ويف تنزيل قوائم تشغيل وألبومات كاملة؟",
  faq1A:
    "نعم. فقط ألصق رابط قائمة تشغيل من يوتيوب أو سبوتيفاي وسيقوم إيكو ويف بإنشاء قائمة تنزيل لعدّة فيديوهات أو مقاطع صوتية دفعة واحدة.",
  faq2Q: "ما هي الصيغ والجودات المتاحة؟",
  faq2A:
    "يمكنك اختيار أفضل جودة متاحة حتى 4K/8K عند توفرها، أو استخدام دقّات HD القياسية، أو ملفات أخف للقوائم الطويلة. للصوت يمكنك تنزيل صيغ عالية الجودة مناسبة لمكتبة الموسيقى لديك.",
  faq3Q: "هل استخدام إيكو ويف آمن؟",
  faq3A:
    "إيكو ويف يعمل بالكامل على جهاز ويندوز الخاص بك، ويخزّن السجل محلياً فقط. احرص دائماً على احترام شروط الاستخدام وحقوق النشر للمواقع التي تقوم بالتنزيل منها.",
} as const;


