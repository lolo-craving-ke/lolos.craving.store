import Image from 'next/image';
import { storeConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="border-t border-[#efe6f5] bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="lolo's craving" width={112} height={72} className="h-16 w-auto object-contain" />
          <p className="mt-3 text-sm leading-6 text-[#6e6175]">Fresh sweets, made with love. Official online store.</p>
        </div>

        <div>
          <h4 className="font-black">Quick links</h4>
          <a className="mt-3 block text-sm text-[#6e6175] hover:text-[#7b4ca0]" href="/">Home</a>
          <a className="mt-2 block text-sm text-[#6e6175] hover:text-[#7b4ca0]" href="/products">Menu</a>
          <a className="mt-2 block text-sm text-[#6e6175] hover:text-[#7b4ca0]" href="/cart">Cart</a>
        </div>

        <div>
          <h4 className="font-black">Contact us</h4>
          <p className="mt-3 text-sm text-[#6e6175]">WhatsApp: +{storeConfig.whatsapp}</p>
          <p className="mt-2 text-sm text-[#6e6175]">Currency: {storeConfig.currency}</p>
          <a className="mt-2 block text-sm text-[#7b4ca0]" href={storeConfig.maps} target="_blank">Open Google Maps</a>
        </div>

        <div>
          <h4 className="font-black">Official store</h4>
          <p className="mt-3 text-sm leading-6 text-[#6e6175]">Order online, request custom boxes, or chat with us on WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
