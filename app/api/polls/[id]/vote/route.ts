import { connectToDatabase } from "@/lib/mongodb";
import Poll from "@/lib/models/Poll";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { optionIndex } = await req.json();

  try {
    await connectToDatabase();

    // First get the poll to validate options length
    const existingPoll = await Poll.findById(params.id);
    if (!existingPoll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    // Validate option index
    if (
      typeof optionIndex !== "number" ||
      optionIndex < 0 ||
      optionIndex >= existingPoll.options.length
    ) {
      return NextResponse.json(
        { error: "Invalid option index" },
        { status: 400 }
      );
    }

    // Safe update using filtered positional operator
    const poll = await Poll.findByIdAndUpdate(
      params.id,
      {
        $inc: {
          [`options.${optionIndex}.votes`]: 1,
          totalVotes: 1,
        },
        $set: { lastVotedAt: new Date() },
      },
      { new: true }
    );

    return NextResponse.json(poll);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit vote" },
      { status: 500 }
    );
  }
}
