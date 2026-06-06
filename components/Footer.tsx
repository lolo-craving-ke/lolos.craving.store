import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="border-t border-[#e8e1ea] bg-white">
      <div className="container-wide grid gap-8 py-10 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="lolo's craving" width={110} height={64} className="h-14 w-auto object-contain" />
          <p className="mt-4 text-sm leading-6 text-[#746b78]">Official online store for fresh sweets and custom bakery orders.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Menu</h4>
          <Link className="mt-4 block text-sm text-[#746b78] hover:text-[#3a243f]" href="/">Home</Link>
          <Link className="mt-2 block text-sm text-[#746b78] hover:text-[#3a243f]" href="/products">Products</Link>
          <Link className="mt-2 block text-sm text-[#746b78] hover:text-[#3a243f]" href="/cart">Cart</Link>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Store</h4>
          <a className="mt-4 block text-sm text-[#746b78] hover:text-[#3a243f]" href={storeConfig.maps} target="_blank">Google Maps</a>
          <a className="mt-2 block text-sm text-[#746b78] hover:text-[#3a243f]" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank">WhatsApp</a>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <p className="mt-4 text-sm text-[#746b78]">WhatsApp: +{storeConfig.whatsapp}</p>
          <p className="mt-2 text-sm text-[#746b78]">Currency: {storeConfig.currency}</p>
        </div>
      </div>
    </footer>
  );
}
