import { NextRequest } from "next/server";
import { getLatestEchoWaveBuild } from "@/lib/get-latest-build";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const explicitTarget = url.searchParams.get("target");

  const build =
    explicitTarget != null
      ? {
          path: explicitTarget,
        }
      : await getLatestEchoWaveBuild();

  if (!build || !build.path) {
    return new Response("No EchoWave build found.", { status: 404 });
  }

  const absolutePath = path.resolve(build.path.toString());
  if (!fs.existsSync(absolutePath)) {
    return new Response("Build not found on server.", { status: 404 });
  }

  const stat = await fs.promises.stat(absolutePath);
  const file = fs.createReadStream(absolutePath);
  const fileName = path.basename(absolutePath);

  return new Response(file as any, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": stat.size.toString(),
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}


