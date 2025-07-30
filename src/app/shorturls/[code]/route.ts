import { connectDB } from '@/lib/db';
import ShortUrl from '@/lib/model';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { code: string } }) {
  await connectDB();
  const record = await ShortUrl.findOne({ shortcode: params.code });

  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    originalURL: record.originalUrl,
    createdAt: record.createdAt,
    expiresAt: record.expiresAt,
    clickCount: record.clicks.length,
    clicks: record.clicks,
  });
}
