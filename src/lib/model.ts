import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: String,
  location: String,
});

const ShortUrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  clicks: [ClickSchema],
});

export default mongoose.models.ShortUrl || mongoose.model('ShortUrl', ShortUrlSchema);
