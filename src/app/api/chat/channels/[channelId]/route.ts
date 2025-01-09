import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({
    channel: {
      id: params.channelId,
      name: '',
      createdAt: new Date().toISOString()
    }
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  const body = await request.json();
  return NextResponse.json({
    channel: {
      id: params.channelId,
      name: body.name,
      updatedAt: new Date().toISOString()
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({ success: true });
}
