import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';
import { SocialLinks } from '@/components/SocialLinks';

export function Footer() {
  return (
    <footer className="border-t border-[#eadfd0] bg-white pb-24 md:pb-0">
      <div className="container-wide grid gap-8 py-10 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="lolo's craving" width={96} height={56} className="h-12 w-auto object-contain" />
          <p className="mt-4 text-sm leading-6 text-[#7b717d]">Official online store for fresh sweets and custom bakery orders.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold">Menu</h4>
          <Link className="mt-4 block text-sm text-[#7b717d] hover:text-[#3a243f]" href="/">Home</Link>
          <a className="mt-2 block text-sm text-[#7b717d] hover:text-[#3a243f]" href="/#menu">Products</a>
          <Link className="mt-2 block text-sm text-[#7b717d] hover:text-[#3a243f]" href="/cart">Cart</Link>
        </div>

        <div>
          <h4 className="text-sm font-bold">Store</h4>
          <a className="mt-4 block text-sm text-[#7b717d] hover:text-[#3a243f]" href={storeConfig.maps} target="_blank">Google Maps</a>
          <a className="mt-2 block text-sm text-[#7b717d] hover:text-[#3a243f]" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank">WhatsApp Orders</a>
          <p className="mt-2 text-sm text-[#7b717d]">Currency: {storeConfig.currency}</p>
        </div>

        <div>
          <h4 className="text-sm font-bold">Social media</h4>
          <div className="mt-4">
            <SocialLinks compact />
          </div>
        </div>
      </div>
    </footer>
  );
}
