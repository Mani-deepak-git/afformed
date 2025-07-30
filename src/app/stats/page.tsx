
'use client';

import { useEffect, useState } from 'react';

interface ShortUrlData {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt: string;
  clicks: { timestamp: string; location: string }[];
}

export default function StatsPage() {
  const [data, setData] = useState<ShortUrlData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📊 URL Statistics</h1>
      {data.map((url, i) => (
        <div key={i} className="mb-6 p-4 border rounded-md shadow-sm">
          <p><strong>Shortcode:</strong> {url.shortcode}</p>
          <p><strong>Original URL:</strong> {url.originalUrl}</p>
          <p><strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}</p>
          <p><strong>Expires:</strong> {new Date(url.expiresAt).toLocaleString()}</p>
          <p><strong>Total Clicks:</strong> {url.clicks.length}</p>

          <div className="mt-3">
            <strong>Click Log:</strong>
            <ul className="list-disc pl-6">
              {url.clicks.map((click, idx) => (
                <li key={idx}>
                  {new Date(click.timestamp).toLocaleString()} — {click.location || 'Unknown'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
