"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";

const translations = {
  en: {
    backToHome: "Back to Home",
    legal: "Legal",
    title: "Privacy Policy",
    subtitle: "How EchoWave handles data on your device.",
    section1Title: "Local-first design",
    section1Text: "EchoWave is a native Windows application. Download links, history, and settings are stored locally on your machine. The app does not maintain a cloud account, user database, or remote analytics service.",
    section2Title: "Network requests & third parties",
    section2Text: "To analyze and download content, EchoWave issues network requests directly to the services you paste links from (for example, video platforms). These requests are made from your device, using your own connection. EchoWave does not proxy or log these URLs on a remote server.",
    section3Title: "Telemetry & Diagnostics",
    section3Text: "The desktop app includes an optional diagnostic reporting feature. If enabled, it may send anonymous crash reports and application logs to our servers to help us identify and fix stability issues. This data is limited to technical information (such as app version, OS version, and error traces) and does not include personal identifiers. You can opt-out of this at any time in the app Settings.",
    section4Title: "Your responsibilities",
    section4Text: "EchoWave is a tool. You are responsible for how you use it, including complying with the terms of service of the platforms you download from and any applicable copyright laws in your region.",
    section5Title: "Contact",
    section5Text: "For questions about this policy or the project, please reach out at",
  },
  ar: {
    backToHome: "العودة للصفحة الرئيسية",
    legal: "قانوني",
    title: "سياسة الخصوصية",
    subtitle: "كيف يتعامل إيكو ويف مع البيانات على جهازك.",
    section1Title: "تصميم محلي أولاً",
    section1Text: "إيكو ويف هو تطبيق ويندوز أصلي. يتم تخزين روابط التنزيل والسجل والإعدادات محلياً على جهازك. التطبيق لا يحتفظ بحساب سحابي أو قاعدة بيانات مستخدمين أو خدمة تحليلات عن بُعد.",
    section2Title: "طلبات الشبكة والأطراف الثالثة",
    section2Text: "لتحليل وتنزيل المحتوى، يُصدر إيكو ويف طلبات شبكة مباشرة إلى الخدمات التي تلصق روابطها منها (على سبيل المثال، منصات الفيديو). يتم إجراء هذه الطلبات من جهازك باستخدام اتصالك الخاص. إيكو ويف لا يستخدم وكيل أو يسجل هذه الروابط على خادم بعيد.",
    section3Title: "القياس عن بُعد والتشخيص",
    section3Text: "يتضمن تطبيق سطح المكتب ميزة تقارير تشخيصية اختيارية. في حالة تفعيلها، قد يرسل التطبيق تقارير أعطال وسجلات مجهولة المصدر إلى خوادمنا لمساعدتنا في إصلاح مشاكل الاستقرار. تقتصر هذه البيانات على المعلومات التقنية (مثل إصدار التطبيق، ونظام التشغيل، وتفاصيل الخطأ) ولا تتضمن أي معلومات شخصية. يمكنك تعطيل هذه الميزة في أي وقت من إعدادات التطبيق.",
    section4Title: "مسؤولياتك",
    section4Text: "إيكو ويف هو أداة. أنت مسؤول عن كيفية استخدامه، بما في ذلك الامتثال لشروط خدمة المنصات التي تقوم بالتنزيل منها وأي قوانين حقوق نشر معمول بها في منطقتك.",
    section5Title: "التواصل",
    section5Text: "للأسئلة حول هذه السياسة أو المشروع، يرجى التواصل على",
  },
};

export default function PrivacyPage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const t = translations[lang];
  const isArabic = lang === "ar";

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

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900/40 px-3 py-2 text-sm text-zinc-300 ring-1 ring-white/5 transition-all hover:bg-zinc-900/60 hover:text-zinc-50 hover:ring-white/10"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToHome}
          </Link>
        </div>

        <header className="mb-10 space-y-2">
          <p className={`text-xs font-semibold uppercase tracking-[0.26em] text-indigo-300/80 ${isArabic ? "font-[family-name:var(--font-arabic)]" : ""}`}>
            {t.legal}
          </p>
          <h1 className={`text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl ${isArabic ? "font-[family-name:var(--font-arabic)]" : ""}`}>
            {t.title}
          </h1>
          <p className={`text-sm text-zinc-400 ${isArabic ? "font-[family-name:var(--font-arabic)]" : ""}`}>
            {t.subtitle}
          </p>
        </header>

        <div className={`space-y-8 rounded-3xl border border-white/5 bg-zinc-950/70 p-6 text-sm text-zinc-300 shadow-xl shadow-black/40 sm:p-8 ${isArabic ? "font-[family-name:var(--font-arabic)]" : ""}`}>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">{t.section1Title}</h2>
            <p>{t.section1Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">{t.section2Title}</h2>
            <p>{t.section2Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">{t.section3Title}</h2>
            <p>{t.section3Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">{t.section4Title}</h2>
            <p>{t.section4Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">{t.section5Title}</h2>
            <p>
              {t.section5Text}{" "}
              <a
                href="mailto:amrkhaledahmed.contact@gmail.com"
                className="font-medium text-indigo-300 hover:text-indigo-200"
              >
                amrkhaledahmed.contact@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}


