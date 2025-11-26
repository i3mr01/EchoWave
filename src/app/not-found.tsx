import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="echowave-shell">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pb-16 pt-12 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-indigo-300/80">
          404
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          That wave doesn&apos;t exist.
        </h1>
        <p className="mt-3 max-w-md text-sm text-zinc-400">
          The page you&apos;re looking for might have been moved, renamed, or never existed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="soft-shadow">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to EchoWave
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/privacy">
              <ArrowLeft className="h-4 w-4" />
              View Privacy Policy
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}


