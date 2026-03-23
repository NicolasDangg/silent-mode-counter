import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silent Mode',
  description: 'A melancholic counter for the things you miss.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
