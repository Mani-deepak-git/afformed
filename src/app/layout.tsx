export const metadata = {
  title: 'URL Shortener',
  description: 'A minimal URL shortening service with stats',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
