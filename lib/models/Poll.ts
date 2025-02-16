import mongoose, { Schema } from "mongoose";

const PollSchema = new Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  totalVotes: { type: Number, default: 0 },
  lastVotedAt: Date,
});

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
