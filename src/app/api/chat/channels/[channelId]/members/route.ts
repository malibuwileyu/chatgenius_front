import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({ members: [] });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  return NextResponse.json({ success: true });
}
