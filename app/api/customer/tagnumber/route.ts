import User from "@/models/User"; // Import your User model
import dbConnect from "@/lib/dbConnect"; // Import your DB connection function
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id, tag } = await request.json();
  
  // Ensure our incoming data is valid
  if (!id || !tag) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Connect to the database
  await dbConnect();
  
  try {
    // Find user by token without updating yet
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.tag = tag;
    
    await user.save(); // Save the updated user document

    return NextResponse.json({ ok: 'User updated', user }, { status: 200 });
  } catch (err: any) {
    // Handle errors during DB operations
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
