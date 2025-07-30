import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ShortUrl from '@/lib/model';
export async function GET() {
  await connectDB();
  const urls = await ShortUrl.find({}, '-__v').lean();
  return NextResponse.json(urls);
}
