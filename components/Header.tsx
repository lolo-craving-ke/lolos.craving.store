import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e1ea] bg-white/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="lolo's craving logo" width={96} height={56} className="h-10 w-auto object-contain md:h-12" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link className="nav-link" href="/">Home</Link>
          <a className="nav-link" href="/#products">Products</a>
          <a className="nav-link" href="/#about">About</a>
          <a className="nav-link" href="/#custom">Custom Orders</a>
          <a className="nav-link" href={storeConfig.maps} target="_blank">Location</a>
        </nav>

        <a
          className="hidden rounded-md bg-[#3a243f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2f1d34] md:inline-flex"
          href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
          target="_blank"
        >
          Order Online
        </a>

        <a
          className="rounded-md bg-[#3a243f] px-4 py-2 text-xs font-semibold text-white md:hidden"
          href="#products"
        >
          Products
        </a>
      </div>
      <div className="border-t border-[#f0e9f1] bg-[#fffdf9]">
        <div className="container-wide flex gap-x-5 overflow-x-auto py-2 text-xs font-medium text-[#746b78] [-webkit-overflow-scrolling:touch]">
          <span className="shrink-0">Fresh Daily</span>
          <span className="shrink-0">Delivery Available</span>
          <span className="shrink-0">M-Pesa Accepted</span>
          <span className="shrink-0">Custom Orders</span>
        </div>
      </div>
    </header>
  );
}
