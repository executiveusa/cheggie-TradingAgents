import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatGPT Trade',
  description: 'Trilingual AI trading copilot'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
