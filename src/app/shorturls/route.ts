import { connectDB } from '@/lib/db';
import ShortUrl from '@/lib/model';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url, validity = 30, shortcode } = await req.json();
  await connectDB();

  if (!url || !/^https?:\/\//.test(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const code = shortcode || nanoid(6);
  const exists = await ShortUrl.findOne({ shortcode: code });
  if (exists) return NextResponse.json({ error: 'Shortcode taken' }, { status: 409 });

  const now = new Date();
  const expiresAt = new Date(now.getTime() + validity * 60_000);

  const short = await ShortUrl.create({
    originalUrl: url,
    shortcode: code,
    createdAt: now,
    expiresAt,
  });

  return NextResponse.json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiresAt.toISOString(),
  }, { status: 201 });
}
