import { storeConfig } from '@/lib/config';

export function FloatingChat() {
  const message = encodeURIComponent("Hello lolo's craving, I need help with my order.");
  const href = `https://wa.me/${storeConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 z-[90] rounded-md bg-[#3a243f] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(42,35,45,0.20)] transition hover:-translate-y-0.5 hover:bg-[#2f1d34]"
      aria-label="WhatsApp support"
    >
      WhatsApp Support
    </a>
  );
}
