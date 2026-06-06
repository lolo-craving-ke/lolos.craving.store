import { storeConfig } from '@/lib/config';

export function FloatingChat() {
  const message = encodeURIComponent("Hello lolo's craving, I need help with my order.");
  const href = `https://wa.me/${storeConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 z-[90] rounded-md border border-[#d9d0dc] bg-white px-4 py-3 text-sm font-semibold text-[#3a243f] shadow-[0_12px_34px_rgba(42,35,45,0.12)] transition hover:-translate-y-0.5 hover:border-[#3a243f]"
      aria-label="WhatsApp support"
    >
      Chat
    </a>
  );
}
