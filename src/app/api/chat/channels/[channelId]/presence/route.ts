import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({
    users: []  // List of online users in the channel
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  const body = await request.json();
  return NextResponse.json({
    status: body.status || 'online',
    userId: body.userId,
    timestamp: new Date().toISOString()
  });
}
