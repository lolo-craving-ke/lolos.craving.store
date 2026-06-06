import { storeConfig } from '@/lib/config';

export function FloatingChat() {
  const message = encodeURIComponent("Hello lolo's craving, I need help with my order.");

  return (
    <a
      href={`https://wa.me/${storeConfig.whatsapp}?text=${message}`}
      target="_blank"
      className="fixed bottom-[84px] right-4 z-[90] rounded-2xl bg-[#2f6f62] px-4 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(34,27,24,0.28)] transition active:scale-95 md:bottom-5"
      aria-label="Chat on WhatsApp"
    >
      <span className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/15">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.22 2.13 11.4c0 1.78.53 3.44 1.45 4.86L2 22l6.03-1.5a10.4 10.4 0 0 0 4.01.8c5.46 0 9.91-4.22 9.91-9.4S17.5 2 12.04 2Zm5.74 13.36c-.24.66-1.36 1.26-1.91 1.33-.5.07-1.13.1-1.83-.11-.42-.13-.96-.31-1.66-.61-2.91-1.24-4.81-4.1-4.96-4.29-.15-.19-1.18-1.49-1.18-2.85 0-1.36.75-2.03 1.02-2.31.27-.28.6-.35.8-.35h.58c.18.01.43-.06.67.49.24.55.82 1.9.89 2.04.07.14.12.3.02.49-.1.19-.15.3-.3.46-.15.16-.31.36-.45.48-.15.14-.3.29-.13.57.17.28.76 1.19 1.63 1.93 1.12.95 2.06 1.24 2.35 1.38.29.14.46.12.63-.07.17-.19.72-.8.91-1.07.19-.28.39-.23.65-.14.27.09 1.7.76 1.99.9.29.14.48.21.55.33.07.12.07.71-.17 1.37Z"/>
          </svg>
        </span>
        <span>Chat</span>
      </span>
    </a>
  );
}
