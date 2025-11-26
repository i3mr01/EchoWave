import fs from "fs";
import path from "path";

export type EchoWaveBuild = {
  /** Absolute filesystem path to the installer/exe */
  path: string;
  /** File name only, e.g. EchoWave-Setup.exe */
  fileName: string;
  /** A short label for the platform, currently always Windows */
  platform: "windows";
  /** Last modified timestamp */
  updatedAt: Date;
};

const CANDIDATE_DIRS = [
  // Preferred installer output
  "../EchoWave/installer_output",
  // Fallback: build artifacts
  "../EchoWave/Build",
  // Published single-file build
  "../EchoWave/bin/Release/net8.0-windows7.0/win-x64/publish",
  // Raw release binaries
  "../EchoWave/bin/Release/net8.0-windows7.0/win-x64",
];

function isExe(name: string) {
  return name.toLowerCase().endsWith(".exe");
}

export async function getLatestEchoWaveBuild(): Promise<EchoWaveBuild | null> {
  const projectRoot = process.cwd();
  const candidates: EchoWaveBuild[] = [];

  for (const relDir of CANDIDATE_DIRS) {
    const dir = path.resolve(projectRoot, relDir);

    if (!fs.existsSync(dir)) continue;
    const entries = await fs.promises.readdir(dir);

    for (const entry of entries) {
      if (!isExe(entry)) continue;
      const fullPath = path.join(dir, entry);
      const stats = await fs.promises.stat(fullPath);
      if (!stats.isFile()) continue;

      candidates.push({
        path: fullPath,
        fileName: entry,
        platform: "windows",
        updatedAt: stats.mtime,
      });
    }
  }

  if (!candidates.length) return null;

  candidates.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  return candidates[0] ?? null;
}


