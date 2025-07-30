'use client';
import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
type FormEntry = {
  url: string;
  validity: string;
  shortcode: string;
};
type ShortURLResponse = {
  shortLink: string;
  expiry: string;
};

export default function Home() {
  const [form, setForm] = useState<FormEntry[]>([
    { url: '', validity: '', shortcode: '' },
  ]);
  const [results, setResults] = useState<ShortURLResponse[]>([]);

  const handleChange = (index: number, field: keyof FormEntry, value: string) => {
    const updated = [...form];
    updated[index][field] = value;
    setForm(updated);
  };

  const addField = () => {
    if (form.length < 5)
      setForm([...form, { url: '', validity: '', shortcode: '' }]);
  };
  const handleSubmit = async () => {
    try {
      const res = await Promise.all(
        form.map(async (entry) => {
          const resp = await fetch('/shorturls', {
            method: 'POST',
            body: JSON.stringify({
              url: entry.url,
              validity: parseInt(entry.validity) || 30,
              shortcode: entry.shortcode,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          return await resp.json();
        })
      );
      setResults(res);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {form.map((entry, i) => (
        <Box key={i} mt={2}>
          <TextField
            label="Long URL"
            fullWidth
            margin="normal"
            value={entry.url}
            onChange={(e) => handleChange(i, 'url', e.target.value)}
          />
          <TextField
            label="Validity (min)"
            type="number"
            margin="normal"
            value={entry.validity}
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
          />
          <TextField
            label="Shortcode (optional)"
            margin="normal"
            value={entry.shortcode}
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
          />
        </Box>
      ))}

      <Box mt={2}>
        <Button variant="outlined" onClick={addField} sx={{ mr: 2 }}>
          Add Field
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Box>
      {results.map((res, idx) => (
        <Box key={idx} mt={3}>
          <Typography>
            Short URL:{' '}
            <a href={res.shortLink} target="_blank" rel="noopener noreferrer">
              {res.shortLink}
            </a>
          </Typography>
          <Typography>Expires: {res.expiry}</Typography>
        </Box>
      ))}
    </Box>
  );
}
