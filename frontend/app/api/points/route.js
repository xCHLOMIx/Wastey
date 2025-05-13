import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";

export async function POST(req) {
  const { email, pointsToAdd } = await req.json();
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOneAndUpdate(
    { email },
    { $inc: { points: pointsToAdd } },
    { new: true }
  );

  return NextResponse.json({ success: true, points: user.points });
}
