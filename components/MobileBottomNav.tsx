'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function HomeIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10.5V21h14V10.5" /></svg>;
}

function MenuIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/></svg>;
}

function CartIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="M6 6h15l-2 9H8L6 6Z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>;
}

function OffersIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="M20 12v8H4v-8"/><path d="M2 7h20v5H2z"/><path d="M12 20V7"/><path d="M12 7H8.5A2.5 2.5 0 1 1 12 4.5V7Z"/><path d="M12 7h3.5A2.5 2.5 0 1 0 12 4.5V7Z"/></svg>;
}

function navClass(active: boolean) {
  return active
    ? 'flex flex-col items-center gap-1 rounded-2xl bg-[#fbf4e8] px-2 py-2 text-[#9b6128] transition'
    : 'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[#3a123f] transition';
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash || '');
    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('scroll', update);
    };
  }, []);

  const isHome = pathname === '/' && hash !== '#products' && hash !== '#offers';
  const isMenu = pathname === '/products' || hash === '#products';
  const isCart = pathname === '/cart' || pathname === '/checkout';
  const isOffers = hash === '#offers';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[80] border-t border-[#eadfcc] bg-white/95 px-3 py-2 shadow-[0_-12px_35px_rgba(34,27,24,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-2 text-[11px] font-black">
        <Link href="/" className={navClass(isHome)}>
          <HomeIcon />
          Home
        </Link>
        <a href="/#products" className={navClass(isMenu)}>
          <MenuIcon />
          Menu
        </a>
        <Link href="/cart" className={navClass(isCart)}>
          <CartIcon />
          Cart
        </Link>
        <a href="/#offers" className={navClass(isOffers)}>
          <OffersIcon />
          Offers
        </a>
      </div>
    </nav>
  );
}
