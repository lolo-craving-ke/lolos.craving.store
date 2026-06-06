'use client';

import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[80] border-t border-[#eadfcc] bg-white/95 px-3 py-2 shadow-[0_-12px_35px_rgba(34,27,24,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-2 text-[11px] font-black">
        <Link href="/" className="rounded-2xl px-2 py-3 text-center text-[#9b6128]">Home</Link>
        <a href="/#offers" className="rounded-2xl px-2 py-3 text-center text-[#221b18]">Offers</a>
        <a href="/#products" className="rounded-2xl px-2 py-3 text-center text-[#221b18]">Menu</a>
        <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="rounded-2xl bg-[#fbf4e8] px-2 py-3 text-center text-[#9b6128]">Chat</a>
      </div>
    </nav>
  );
}
