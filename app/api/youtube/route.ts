import { NextResponse } from 'next/server';
import { getYouTubeChannelStats } from '@/app/actions/youtube';

export async function GET() {
  try {
    const stats = await getYouTubeChannelStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
