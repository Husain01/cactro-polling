"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatsCard from "@/components/stats-card";
import { Skeleton } from "@/components/ui/skeleton";

interface PollOption {
  text: string;
  votes: number;
}

async function fetchResults(id: string) {
  const res = await fetch(`/api/polls/${id}`);
  return res.json();
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["poll", params.id],
    queryFn: () => fetchResults(params.id),
    refetchInterval: 2000,
  });

  if (isLoading) return <ResultsSkeleton />;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Votes"
          value={data.totalVotes}
          description="Total votes cast"
        />
        <StatsCard
          title="Leading Option"
          value={Math.max(...data.options.map((o: PollOption) => o.votes))}
          description="Most votes received"
        />
        <StatsCard
          title="Last Vote"
          value={new Date(data.lastVotedAt).toLocaleTimeString()}
          description="Most recent activity"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{data.question} - Live Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.options}>
                <XAxis dataKey="text" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[500px] rounded-lg" />
    </div>
  );
}
