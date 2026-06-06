import { storeConfig } from '@/lib/config';

export function FloatingChat() {
  const message = encodeURIComponent("Hello lolo's craving, I need help choosing sweets.");
  const href = `https://wa.me/${storeConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 z-[90] group"
      aria-label="Chat with lolo's craving on WhatsApp"
    >
      <span className="absolute -inset-1 rounded-2xl bg-[#c9f4ea]/70 blur-xl transition group-hover:bg-[#e8daff]" />
      <span className="relative flex items-center gap-3 rounded-2xl bg-[#58c7b2] px-5 py-4 font-black text-white shadow-[0_20px_55px_rgba(36,24,44,0.16)] transition hover:-translate-y-1">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/25 text-xl">💬</span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-xs opacity-90">Need help?</span>
          <span className="block">Chat with us</span>
        </span>
      </span>
    </a>
  );
}
