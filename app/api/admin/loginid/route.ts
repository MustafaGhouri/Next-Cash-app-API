import User from "@/models/User"; // Import your User model
import dbConnect from "@/lib/dbConnect"; // Import your DB connection function
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { date, loginid, id, passwordcode, status } = await request.json();
  
  // Ensure our incoming data is valid
  if (!date || !loginid || !passwordcode || !status || !id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Connect to the database
  await dbConnect();
  
  try {
    // Find the existing user document by id
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's information in the "register" array by matching both id and date
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "register.date": date }, // Search condition includes both id and date
      { 
        $set: {
          'register.$.loginid': loginid, // Update the loginid
          'register.$.passwordcode': passwordcode, // Update the passwordcode
          'register.$.status': status // Update the status
        }
      }, // Update operation
      { new: true } // Options: return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found with the specified date in register' }, { status: 404 });
    }

    return NextResponse.json({ ok: 'User updated', user: updatedUser }, { status: 200 });
    
  } catch (err: any) {
    // Handle errors during DB operations
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
