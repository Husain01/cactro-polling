import { connectToDatabase } from "@/lib/mongodb";
import Poll from "@/lib/models/Poll";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const poll = await Poll.findById(params.id);

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...poll.toJSON(),
      _id: poll._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch poll" },
      { status: 500 }
    );
  }
}
