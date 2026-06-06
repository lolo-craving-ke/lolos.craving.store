import { storeConfig } from '@/lib/config';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/profile.php?id=61590221048028',
    short: 'Fb'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lolo.craving.ke/',
    short: 'Ig'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@lolo.craving.ke',
    short: 'Tk'
  },
  {
    name: 'WhatsApp',
    url: `https://wa.me/${storeConfig.whatsapp}`,
    short: 'Wa'
  }
];

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'flex flex-wrap gap-2' : 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4'}>
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          className={
            compact
              ? 'inline-flex items-center gap-2 rounded-full border border-[#eadfd0] bg-white px-4 py-2 text-sm font-bold text-[#3a243f] transition hover:border-[#f4a62a] hover:text-[#df8e10]'
              : 'group rounded-[24px] border border-[#eadfd0] bg-white p-4 shadow-[0_12px_30px_rgba(36,27,38,0.05)] transition hover:-translate-y-1 hover:border-[#f4a62a]'
          }
        >
          <span className={compact ? 'grid h-8 w-8 place-items-center rounded-full bg-[#fff2df] text-xs text-[#df8e10]' : 'grid h-12 w-12 place-items-center rounded-2xl bg-[#fff2df] text-sm font-black text-[#df8e10] transition group-hover:bg-[#f4a62a] group-hover:text-white'}>
            {item.short}
          </span>
          <span>
            <span className={compact ? 'font-bold' : 'block font-black text-[#241b26]'}>{item.name}</span>
            {!compact && <span className="mt-1 block text-xs font-semibold text-[#7b717d]">Follow lolo&apos;s craving</span>}
          </span>
        </a>
      ))}
    </div>
  );
}
