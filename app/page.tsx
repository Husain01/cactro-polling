import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-blue-600 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8" />
            QuickPoll
          </h1>
          <p className="text-xl text-muted-foreground">
            Create instant polls and get real-time results
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/create">
              Get Started
              <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">🚀 Instant Creation</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Create a poll in seconds with our simple interface
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">📊 Live Results</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Watch votes come in real-time with interactive charts
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">🔗 Easy Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Share your poll with a single link
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center text-muted-foreground space-y-2">
          <p>No signup required • Free forever • Mobile-friendly</p>
          <div className="flex gap-4 justify-center">
            <Button variant="link" asChild>
              <Link href="/create">Create Poll</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/poll/sample/results">View Demo</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
