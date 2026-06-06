import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <>
      <div className="hidden border-b border-[#efe6f5] bg-[#fff7fb] text-sm font-bold text-[#24182c]/75 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span>🦋 Freshly made every day</span>
          <span>🚚 Delivery across Nairobi</span>
          <span>💳 M-Pesa accepted</span>
          <span>💬 Need help? Chat with us on WhatsApp</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#efe6f5] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="lolo's craving logo" width={118} height={72} className="h-16 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold text-[#24182c]/75 md:flex">
            <Link className="nav-link hover:text-[#7b4ca0]" href="/">Home</Link>
            <Link className="nav-link hover:text-[#7b4ca0]" href="/products">Menu</Link>
            <a className="nav-link hover:text-[#7b4ca0]" href="/#about">About Us</a>
            <a className="nav-link hover:text-[#7b4ca0]" href="/#custom">Custom Orders</a>
            <a className="nav-link hover:text-[#7b4ca0]" href={storeConfig.maps} target="_blank">Location</a>
            <Link className="nav-link hover:text-[#7b4ca0]" href="/cart">Cart</Link>
          </nav>

          <a
            className="rounded-xl bg-[#7b4ca0] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#6d3f91]"
            href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
            target="_blank"
          >
            Order on WhatsApp
          </a>
        </div>
      </header>
    </>
  );
}
