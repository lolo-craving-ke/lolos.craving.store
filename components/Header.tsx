import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#efe3f7] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white shadow-sm ring-1 ring-[#efe3f7] transition group-hover:scale-105">
            <Image src="/logo.png" alt="lolo's craving logo" width={58} height={58} className="object-contain" />
          </div>
          <div>
            <p className="text-xl font-black lowercase tracking-wide text-[#4b235f]">{storeConfig.name}</p>
            <p className="text-xs font-bold tracking-[0.22em] text-plum/45">OFFICIAL STORE</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-plum/70 md:flex">
          <Link className="transition hover:text-[#8f63c8]" href="/">Home</Link>
          <Link className="transition hover:text-[#8f63c8]" href="/products">Menu</Link>
          <a className="transition hover:text-[#8f63c8]" href="/#about">About</a>
          <a className="transition hover:text-[#8f63c8]" href="/#delivery">Delivery</a>
          <a className="transition hover:text-[#8f63c8]" href={storeConfig.maps} target="_blank">Location</a>
          <Link className="transition hover:text-[#8f63c8]" href="/cart">Cart</Link>
        </nav>

        <a
          className="rounded-full bg-[#BFEFEA] px-5 py-3 text-sm font-black text-[#4b235f] shadow-sm transition hover:scale-[1.03]"
          href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\'s craving, I would like to place an order.')}`}
          target="_blank"
        >
          Order on WhatsApp
        </a>
      </div>
    </header>
  );
}
