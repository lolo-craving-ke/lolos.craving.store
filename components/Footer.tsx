import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

function SocialIcon({ type }: { type: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp' }) {
  const label = { facebook: 'f', instagram: '◎', tiktok: '♪', whatsapp: '☎' }[type];
  return <span className="grid h-11 w-11 place-items-center rounded-full bg-[#9b6128] text-lg font-black text-white">{label}</span>;
}

export function Footer() {
  return (
    <footer className="border-t border-[#eadfcc] bg-white pb-24 md:pb-0">
      <div className="container-wide grid gap-8 py-10 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="lolo's craving" width={96} height={56} className="h-12 w-auto object-contain" />
          <p className="mt-4 text-sm leading-6 text-[#7e7169]">Official online store for fresh sweets and custom bakery orders.</p>
        </div>
        <div>
          <h4 className="text-sm font-black">Menu</h4>
          <Link className="mt-4 block text-sm text-[#7e7169]" href="/">Home</Link>
          <a className="mt-2 block text-sm text-[#7e7169]" href="/#offers">Offers</a>
          <a className="mt-2 block text-sm text-[#7e7169]" href="/#products">Products</a>
        </div>
        <div>
          <h4 className="text-sm font-black">Store</h4>
          <p className="mt-4 text-sm leading-6 text-[#7e7169]">Nextgen mall, South C, Nairobi, Kenya</p>
          <a className="mt-2 block text-sm text-[#7e7169]" href={storeConfig.maps} target="_blank">Google Maps</a>
          <a className="mt-2 block text-sm text-[#7e7169]" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank">WhatsApp</a>
        </div>
        <div>
          <h4 className="text-sm font-black">Social media</h4>
          <div className="mt-4 flex gap-3">
            <a aria-label="Facebook" href="https://web.facebook.com/profile.php?id=61590221048028" target="_blank"><SocialIcon type="facebook" /></a>
            <a aria-label="Instagram" href="https://www.instagram.com/lolo.craving.ke/" target="_blank"><SocialIcon type="instagram" /></a>
            <a aria-label="TikTok" href="https://www.tiktok.com/@lolo.craving.ke" target="_blank"><SocialIcon type="tiktok" /></a>
            <a aria-label="WhatsApp" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank"><SocialIcon type="whatsapp" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
