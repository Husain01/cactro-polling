import { notFound } from "next/navigation";

// Server Component
import PollPageClient from "./PollPageClient";

async function getPollData(id: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/polls/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PollPage({ params }: { params: { id: string } }) {
  const poll = await getPollData(params.id);
  if (!poll) notFound();

  return <PollPageClient initialPoll={poll} pollId={params.id} />;
}
