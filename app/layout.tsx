import type { Metadata } from 'next';
import './globals.css';
import { storeConfig } from '@/lib/config';
import { FloatingChat } from '@/components/FloatingChat';

export const metadata: Metadata = {
  title: `${storeConfig.name} | Official Store`,
  description: "Official online store for fresh Egyptian sweets, bakery treats, custom boxes and orders in Nairobi."
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
