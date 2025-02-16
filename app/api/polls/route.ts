import { connectToDatabase } from "@/lib/mongodb";
import Poll from "@/lib/models/Poll";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, options } = await req.json();

  try {
    await connectToDatabase();
    const poll = new Poll({
      question,
      options: options.map((text: string) => ({ text })),
    });

    await poll.save();
    return NextResponse.json({ id: poll._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const polls = await Poll.find().sort({ createdAt: -1 });
    return NextResponse.json(polls);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}
