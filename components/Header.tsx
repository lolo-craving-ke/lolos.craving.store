import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd0] bg-[#fffdf8]/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="lolo's craving logo" width={96} height={56} className="h-10 w-auto object-contain md:h-12" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link className="nav-link" href="/">Home</Link>
          <a className="nav-link" href="/#menu">Menu</a>
          <a className="nav-link" href="/#popular">Popular</a>
          <a className="nav-link" href="/#custom">Custom Orders</a>
          <a className="nav-link" href={storeConfig.maps} target="_blank">Location</a>
        </nav>

        <a
          className="hidden rounded-2xl bg-[#3a243f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2e1b33] md:inline-flex"
          href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
          target="_blank"
        >
          Order Online
        </a>

        <a href="#menu" className="rounded-2xl bg-[#f4a62a] px-4 py-2 text-xs font-bold text-white md:hidden">
          Menu
        </a>
      </div>
    </header>
  );
}
