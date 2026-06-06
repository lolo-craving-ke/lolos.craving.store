import type { Metadata } from 'next';
import './globals.css';
import { storeConfig } from '@/lib/config';
import { FloatingChat } from '@/components/FloatingChat';

export const metadata: Metadata = {
  title: `${storeConfig.name} | Official Store`,
  description: 'Official page and online ordering store for lolo\'s craving.'
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
