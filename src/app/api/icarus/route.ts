import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Make the GET request to the specified URL
    const response = await fetch('https://daedalus.herokuapp.com/webhook/icarus', {
      method: 'GET',
    });

    const data = await response.json();
    const message = data.message || data; // Save the value of the "message" field, or the entire response data
    
    console.log('Status:', message);
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}