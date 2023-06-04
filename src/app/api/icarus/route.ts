import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const message = `Server is flying!`;
    return NextResponse.json({ message }, { status: 200 });
}