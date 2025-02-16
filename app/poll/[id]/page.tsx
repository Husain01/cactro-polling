import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Server Component
const PollPageClient = dynamic(() => import("./PollPageClient"), {
  ssr: false,
});

async function getPollData(id: string) {
  // Use production URL first, then Vercel's URL
  const baseUrl =
    process.env.NEXT_PUBLIC_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  console.log("Base URL:", baseUrl); // Debugging

  try {
    const res = await fetch(`${baseUrl}/api/polls/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function PollPage({ params }: { params: { id: string } }) {
  const poll = await getPollData(params.id);
  if (!poll) notFound();

  return <PollPageClient initialPoll={poll} pollId={params.id} />;
}
