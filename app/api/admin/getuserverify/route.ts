import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await dbConnect();

  try {
    const users = await User.find({ phonenumber: { $ne: "none" }, status: "complete" }); // Use 'users' since you are fetching multiple

    // Convert mongoose documents to plain JS objects
    const usersInfo = users.map(user => user.toObject());

    return NextResponse.json({ ok: 'Fetch successful', data: usersInfo }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'An error occurred while fetching users' }, { status: 500 });
  }
};