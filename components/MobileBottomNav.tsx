'use client';

import Link from 'next/link';
import { storeConfig } from '@/lib/config';

function Icon({ type }: { type: 'home' | 'menu' | 'cart' | 'chat' }) {
  if (type === 'home') return <span className="block h-4 w-4 rounded-sm border-2 border-current" />;
  if (type === 'menu') return <span className="grid h-4 w-4 grid-cols-2 gap-0.5">{Array.from({ length: 4 }).map((_, i) => <span key={i} className="rounded-[2px] bg-current" />)}</span>;
  if (type === 'cart') return <span className="block h-4 w-5 rounded-sm border-2 border-current border-t-0" />;
  return <span className="block h-4 w-4 rounded-full border-2 border-current" />;
}

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[80] border-t border-[#eadfd0] bg-white/95 px-3 py-2 shadow-[0_-12px_35px_rgba(36,27,38,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-2">
        <Link href="/" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold text-[#3a243f]">
          <Icon type="home" />
          Home
        </Link>
        <a href="/#menu" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold text-[#3a243f]">
          <Icon type="menu" />
          Menu
        </a>
        <a href="/cart" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold text-[#3a243f]">
          <Icon type="cart" />
          Cart
        </a>
        <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="flex flex-col items-center gap-1 rounded-2xl bg-[#fff2df] px-2 py-2 text-[11px] font-bold text-[#df8e10]">
          <Icon type="chat" />
          Chat
        </a>
      </div>
    </nav>
  );
}
