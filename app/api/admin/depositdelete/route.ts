import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
    // Attempt to parse the JSON body
    let requestData;
    try {
        requestData = await request.json();
    } catch (err) {
        return NextResponse.json({ error: 'Failed to parse JSON' }, { status: 400 });
    }

    const { id, date } = requestData;

    // Ensure required fields are present
    if (!id || !date) {
        return NextResponse.json({ error: 'Missing required fields: id or date' }, { status: 400 });
    }
    
    await dbConnect();

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Try to find the deposit using the provided date
        const depositIndex = user.deposit.findIndex(dep => {
            const depDate = new Date(dep.date).getTime(); // Convert the deposit date to timestamp
            const requestDate = new Date(date).getTime(); // Convert the requested date to timestamp
            return depDate === requestDate;
        });

        // Check if the deposit was found
        if (depositIndex === -1) {
            return NextResponse.json({ error: 'No deposit found with the given date' }, { status: 404 });
        }

        // Delete the found deposit entry
        user.deposit.splice(depositIndex, 1);

        // Save the user document
        const updatedUser = await user.save();

        return NextResponse.json({
            ok: 'Deposit deleted successfully',
            user: updatedUser // Include the updated user if needed
        }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
    }
};
