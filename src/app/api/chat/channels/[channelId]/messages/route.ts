import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({
    messages: []
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  const body = await request.json();
  return NextResponse.json({
    message: {
      id: new Date().getTime().toString(),
      content: body.content,
      channelId: params.channelId,
      timestamp: new Date().toISOString()
    }
  });
}
