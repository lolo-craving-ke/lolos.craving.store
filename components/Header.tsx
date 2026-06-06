import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e1ea] bg-white/95 backdrop-blur">
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="lolo's craving logo" width={110} height={64} className="h-14 w-auto object-contain" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/products">Menu</Link>
          <a className="nav-link" href="/#about">About</a>
          <a className="nav-link" href="/#custom">Custom Orders</a>
          <a className="nav-link" href={storeConfig.maps} target="_blank">Location</a>
          <Link className="nav-link" href="/cart">Cart</Link>
        </nav>

        <a
          className="hidden rounded-md bg-[#3a243f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2f1d34] md:inline-flex"
          href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
          target="_blank"
        >
          Order Online
        </a>
      </div>
    </header>
  );
}
