import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    channels: []
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    channel: {
      id: new Date().getTime().toString(),
      name: body.name,
      createdAt: new Date().toISOString()
    }
  });
}
