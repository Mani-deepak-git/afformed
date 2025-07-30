import { connectDB } from '@/lib/db';
import ShortUrl from '@/lib/model';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { code: string } }) {
  await connectDB();
  const record = await ShortUrl.findOne({ shortcode: params.code });

  if (!record || new Date() > record.expiresAt) {
    return <p>Expired or not found</p>;
  }

 record.clicks.push({ timestamp: new Date(), location: 'India' }); // or use geo lookup
await record.save();


  redirect(record.originalUrl);
}
