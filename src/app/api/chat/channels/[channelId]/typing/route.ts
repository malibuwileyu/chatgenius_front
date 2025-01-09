import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({
    users: []  // List of users currently typing
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  const body = await request.json();
  return NextResponse.json({
    isTyping: body.isTyping || false,
    userId: body.userId,
    timestamp: new Date().toISOString()
  });
}
