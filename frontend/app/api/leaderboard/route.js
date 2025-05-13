import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URI);
  const users = await User.find({}).sort({ points: -1 }).limit(10);

  return NextResponse.json(users);
}
