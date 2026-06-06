import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="lolo's craving logo" width={56} height={56} className="rounded-2xl object-cover" />
          <div>
            <p className="font-black lowercase text-xl text-plum">{storeConfig.name}</p>
            <p className="text-xs text-ink/60">Sweet moments, fresh cravings</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <a href={storeConfig.maps} target="_blank">Location</a>
        </nav>
        <a className="btn-primary py-2" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank">WhatsApp</a>
      </div>
    </header>
  );
}
