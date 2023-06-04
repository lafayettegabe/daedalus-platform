import { NextResponse } from "next/server";

export async function GET(request: Request) {

    // call https://daedalus.herokuapp.com/webhook/icarus
    const message = await fetch('https://daedalus.herokuapp.com/webhook/icarus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    
    return NextResponse.json({ message }, { status: 200 });
}