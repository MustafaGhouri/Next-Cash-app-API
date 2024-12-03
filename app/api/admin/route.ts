import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        return NextResponse.json(
            { ok: 'Fetch successful', data: {} },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { error: 'An error occurred while fetching users' },
            { status: 500 }
        );
    }
};
