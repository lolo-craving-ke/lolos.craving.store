import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#9b6128] text-white">
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="lolo's craving logo" width={96} height={56} className="h-10 w-auto object-contain md:h-12" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link className="text-sm font-bold text-white/80 hover:text-white" href="/">Home</Link>
          <a className="text-sm font-bold text-white/80 hover:text-white" href="/#offers">Offers</a>
          <a className="text-sm font-bold text-white/80 hover:text-white" href="/#categories">Categories</a>
          <a className="text-sm font-bold text-white/80 hover:text-white" href="/#products">Products</a>
          <a className="text-sm font-bold text-white/80 hover:text-white" href={storeConfig.maps} target="_blank">Location</a>
        </nav>

        <a
          className="hidden rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#9b6128] transition hover:bg-[#fbf4e8] md:inline-flex"
          href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
          target="_blank"
        >
          Order Online
        </a>

        <a href="#products" className="rounded-2xl bg-white px-4 py-2 text-xs font-black text-[#9b6128] md:hidden">
          Menu
        </a>
      </div>
    </header>
  );
}
