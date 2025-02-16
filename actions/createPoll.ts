"use server";

import Poll from "@/lib/models/Poll";
import { connectToDatabase } from "@/lib/mongodb";

export async function createPoll(
  prevState: { id: string | null } | null,
  formData: FormData
): Promise<{ id: string | null; error?: string }> {
  try {
    const question = formData.get("question") as string;
    const options = formData.getAll("options") as string[];

    await connectToDatabase();

    const poll = new Poll({
      question,
      options: options
        .filter((opt) => opt.trim() !== "")
        .map((text) => ({ text })),
    });

    await poll.save();
    return { id: poll._id.toString() };
  } catch (error) {
    console.error("Create Poll Error:", error);
    return { id: null, error: "Failed to create poll. Please try again." };
  }
}
