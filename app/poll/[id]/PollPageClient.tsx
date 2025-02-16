"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ShareButton from "@/components/share-button";
import { useState, useEffect } from "react";

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  lastVotedAt: string;
}

export default function PollPageClient({
  initialPoll,
  pollId,
}: {
  initialPoll: Poll;
  pollId: string;
}) {
  const [votingIndex, setVotingIndex] = useState<number | null>(null);
  const [poll, setPoll] = useState(initialPoll);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Any window usage goes here
    if (typeof window !== 'undefined') {
      // Browser-safe code
    }
  }, []);

  if (!isMounted) return null;

  const handleVote = async (index: number) => {
    setVotingIndex(index);
    try {
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ optionIndex: index }),
      });

      if (res.ok) {
        const updatedPoll = await res.json();
        setPoll(updatedPoll);
      } else {
        alert("Failed to submit vote");
      }
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setVotingIndex(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{poll.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {poll.options.map((option: PollOption, index: number) => (
              <Button
                key={index}
                type="button"
                className="w-full justify-start"
                variant="outline"
                disabled={votingIndex === index}
                onClick={() => handleVote(index)}
              >
                {option.text}
                {votingIndex === index && "..."}
              </Button>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <ShareButton pollId={pollId} />
              <Button asChild variant="outline">
                <Link href={`/poll/${pollId}/results`}>Live Results</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link to collect votes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
