import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silent Mode',
  description: 'A moment of stillness.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
