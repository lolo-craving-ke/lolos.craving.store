import type { Metadata } from 'next';
import './globals.css';
import { storeConfig } from '@/lib/config';
import { FloatingCart } from '@/components/FloatingCart';
import { FloatingChat } from '@/components/FloatingChat';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: `${storeConfig.name} | Official Store`,
  description: "Official online store for fresh bakery treats, special offers and custom orders in Nairobi."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingCart />
        <FloatingChat />
        <MobileBottomNav />
      </body>
    </html>
  );
}
