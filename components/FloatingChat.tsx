import { storeConfig } from '@/lib/config';

export function FloatingChat() {
  const message = encodeURIComponent("Hello lolo's craving, I need help with my order.");
  const href = `https://wa.me/${storeConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 z-[90] group"
      aria-label="WhatsApp support"
    >
      <span className="absolute -inset-1 rounded-2xl bg-[#bfdcd6]/70 blur-lg opacity-80 transition group-hover:opacity-100" />
      <span className="relative flex items-center gap-3 rounded-2xl bg-[#2f6f62] px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(42,35,45,0.22)] transition hover:-translate-y-1 hover:bg-[#285f54]">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/15">
          <span className="block h-3.5 w-3.5 rounded-full bg-white" />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-medium opacity-80">Need help?</span>
          <span className="block">Chat</span>
        </span>
      </span>
    </a>
  );
}
