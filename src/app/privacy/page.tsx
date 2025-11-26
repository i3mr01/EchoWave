export const metadata = {
  title: "EchoWave - Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="echowave-shell">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-indigo-300/80">
            Legal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400">
            How EchoWave handles data on your device.
          </p>
        </header>

        <div className="space-y-8 rounded-3xl border border-white/5 bg-zinc-950/70 p-6 text-sm text-zinc-300 shadow-xl shadow-black/40 sm:p-8">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">Local-first design</h2>
            <p>
              EchoWave is a native Windows application. Download links, history, and settings
              are stored locally on your machine. The app does not maintain a cloud account,
              user database, or remote analytics service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Network requests &amp; third parties
            </h2>
            <p>
              To analyze and download content, EchoWave issues network requests directly to
              the services you paste links from (for example, video platforms). These
              requests are made from your device, using your own connection. EchoWave does
              not proxy or log these URLs on a remote server.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">Telemetry</h2>
            <p>
              The desktop app does not include invasive telemetry. Basic diagnostic logs may
              be written to local files to help with debugging and error reporting, and you
              can review or delete these logs at any time from your system.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Your responsibilities
            </h2>
            <p>
              EchoWave is a tool. You are responsible for how you use it, including
              complying with the terms of service of the platforms you download from and any
              applicable copyright laws in your region.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100">Contact</h2>
            <p>
              For questions about this policy or the project, please open an issue on the{" "}
              <a
                href="https://github.com/i3mr01/EchoWave"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-indigo-300 hover:text-indigo-200"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}


