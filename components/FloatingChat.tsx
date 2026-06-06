import { storeConfig } from '@/lib/config';

export function FloatingChat() {
  const message = encodeURIComponent('Hello lolo\'s craving, I need help with my order.');
  const href = `https://wa.me/${storeConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 z-[90] group"
      aria-label="Chat with lolo's craving on WhatsApp"
    >
      <span className="absolute -inset-2 rounded-full bg-mint/30 blur-xl transition group-hover:bg-lavender/40" />
      <span className="absolute right-0 top-0 h-4 w-4 animate-ping rounded-full bg-mint" />
      <span className="relative flex items-center gap-3 rounded-full border border-white/15 bg-[#111018]/90 px-5 py-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-1">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-mint to-lavender text-xl text-plum shadow-[0_0_30px_rgba(200,247,231,0.35)]">💬</span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-xs font-bold text-mint">Need help?</span>
          <span className="block font-black">Chat with us</span>
        </span>
      </span>
    </a>
  );
}
