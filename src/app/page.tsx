import { getLatestEchoWaveBuild } from "@/lib/get-latest-build";
import { HomeClient } from "@/components/home-client";

export default async function Home() {
  const latest = await getLatestEchoWaveBuild();

  return <HomeClient latest={latest} />;
}
