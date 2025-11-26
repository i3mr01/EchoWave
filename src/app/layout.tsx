import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/smooth-scroller";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EchoWave - Download video and audio from anywhere",
  description:
    "EchoWave is a fast, modern desktop app for downloading video and audio from anywhere on the web. Simple, powerful, and built for Windows.",
  metadataBase:
    typeof window === "undefined" ? new URL("https://echowave.app") : undefined,
  openGraph: {
    title: "EchoWave - Download video and audio from anywhere",
    description:
      "Paste a link, pick your format and quality, and let EchoWave handle the rest.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoWave - Download video and audio from anywhere",
    description:
      "A sleek Windows downloader with quality controls, history, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arabic.variable} antialiased bg-echowave-950 text-zinc-50`}
      >
        <SmoothScroller>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </SmoothScroller>
      </body>
    </html>
  );
}

