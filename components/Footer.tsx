import Image from 'next/image';
import Link from 'next/link';
import { storeConfig } from '@/lib/config';

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06Z"/></svg>;
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>;
}
function TikTokIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M16.6 3c.35 2.18 1.58 3.48 3.75 3.62v3.12a7.15 7.15 0 0 1-3.75-1.13v6.15c0 3.11-2.1 5.24-5.23 5.24-2.86 0-5.15-2.05-5.15-4.77 0-3.12 2.35-5.1 5.82-4.85v3.18c-1.6-.25-2.58.43-2.58 1.54 0 .95.78 1.62 1.85 1.62 1.22 0 2.02-.7 2.02-2.24V3h3.27Z"/></svg>;
}
function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12.04 2C6.58 2 2.13 6.22 2.13 11.4c0 1.78.53 3.44 1.45 4.86L2 22l6.03-1.5a10.4 10.4 0 0 0 4.01.8c5.46 0 9.91-4.22 9.91-9.4S17.5 2 12.04 2Zm5.74 13.36c-.24.66-1.36 1.26-1.91 1.33-.5.07-1.13.1-1.83-.11-.42-.13-.96-.31-1.66-.61-2.91-1.24-4.81-4.1-4.96-4.29-.15-.19-1.18-1.49-1.18-2.85 0-1.36.75-2.03 1.02-2.31.27-.28.6-.35.8-.35h.58c.18.01.43-.06.67.49.24.55.82 1.9.89 2.04.07.14.12.3.02.49-.1.19-.15.3-.3.46-.15.16-.31.36-.45.48-.15.14-.3.29-.13.57.17.28.76 1.19 1.63 1.93 1.12.95 2.06 1.24 2.35 1.38.29.14.46.12.63-.07.17-.19.72-.8.91-1.07.19-.28.39-.23.65-.14.27.09 1.7.76 1.99.9.29.14.48.21.55.33.07.12.07.71-.17 1.37Z"/></svg>;
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a aria-label={label} href={href} target="_blank" className="grid h-11 w-11 place-items-center rounded-full bg-[#9b6128] text-white transition hover:bg-[#7a461c]">
      {children}
    </a>
  );
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
            <SocialButton label="Facebook" href="https://web.facebook.com/profile.php?id=61590221048028"><FacebookIcon /></SocialButton>
            <SocialButton label="Instagram" href="https://www.instagram.com/lolo.craving.ke/"><InstagramIcon /></SocialButton>
            <SocialButton label="TikTok" href="https://www.tiktok.com/@lolo.craving.ke"><TikTokIcon /></SocialButton>
            <SocialButton label="WhatsApp" href={`https://wa.me/${storeConfig.whatsapp}`}><WhatsAppIcon /></SocialButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
