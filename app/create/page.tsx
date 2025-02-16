"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFormState } from "react-dom";
import { createPoll } from "@/actions/createPoll";
import Link from "next/link";

interface State {
  id: string | null;
  error?: string;
}

export default function CreatePage() {
  const [state, formAction] = useFormState<State, FormData>(createPoll, {
    id: null,
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Question</label>
              <Input
                name="question"
                placeholder="What's your favorite framework?"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Options</label>
              {[0, 1, 2].map((i) => (
                <Input
                  key={i}
                  name="options"
                  placeholder={`Option ${i + 1}`}
                  required={i < 2}
                />
              ))}
            </div>

            <Button type="submit">Create Poll</Button>

            {state.error && (
              <p className="text-red-500 text-sm mt-2">{state.error}</p>
            )}
            {state.id && (
              <div className="mt-4 space-y-2">
                <p className="text-green-500">Poll created successfully!</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/poll/${state.id}`}>View Poll</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/poll/${state.id}/results`}>View Results</Link>
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
