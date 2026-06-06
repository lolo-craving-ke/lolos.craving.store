import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08070b]/82 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <Image src="/logo.jpg" alt="lolo's craving logo" width={58} height={58} className="rounded-2xl object-cover ring-1 ring-white/10 transition group-hover:scale-105" />
          <div>
            <p className="text-xl font-black lowercase tracking-wide text-lavender">{storeConfig.name}</p>
            <p className="text-xs tracking-[0.25em] text-white/45">BAKED WITH LOVE</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/75 md:flex">
          <Link className="transition hover:text-lavender" href="/">Home</Link>
          <Link className="transition hover:text-lavender" href="/products">Shop</Link>
          <Link className="transition hover:text-lavender" href="/cart">Cart</Link>
          <a className="transition hover:text-lavender" href={storeConfig.maps} target="_blank">Location</a>
          <Link className="transition hover:text-lavender" href="/admin/login">Admin</Link>
        </nav>

        <a
          className="rounded-full bg-mint px-5 py-3 text-sm font-black text-plum shadow-[0_0_30px_rgba(200,247,231,0.25)] transition hover:scale-[1.03]"
          href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\'s craving, I would like to place an order.')}`}
          target="_blank"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
