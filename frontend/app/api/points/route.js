import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { email, pointsToAdd } = await req.json();

    if (!email || typeof pointsToAdd !== "number") {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOneAndUpdate(
      { email },
      { $inc: { points: pointsToAdd } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, points: user.points });

  } catch (err) {
    console.error("Error in /api/points:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}