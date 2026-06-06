import type { Metadata } from 'next';
import './globals.css';
import { storeConfig } from '@/lib/config';
import { FloatingChat } from '@/components/FloatingChat';

export const metadata: Metadata = {
  title: storeConfig.name,
  description: 'Official online store and ordering dashboard for lolo\'s craving.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
