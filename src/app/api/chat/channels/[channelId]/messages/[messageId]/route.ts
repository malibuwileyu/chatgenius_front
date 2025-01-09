import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string; messageId: string } }
) {
  return NextResponse.json({
    message: {
      id: params.messageId,
      content: '',
      channelId: params.channelId,
      timestamp: new Date().toISOString()
    }
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { channelId: string; messageId: string } }
) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { channelId: string; messageId: string } }
) {
  return NextResponse.json({ success: true });
}
