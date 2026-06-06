'use client';

import { money } from '@/lib/money';
import { storeConfig } from '@/lib/config';

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  available: boolean;
  category?: { name: string } | null;
};

function addToCart(product: Product) {
  const cart = JSON.parse(localStorage.getItem('lolos_cart') || '[]');
  const existing = cart.find((item: any) => item.id === product.id);

  if (existing) existing.quantity += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });

  localStorage.setItem('lolos_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
  alert(`${product.name} added to cart`);
}

export function ProductCard({ product }: { product: Product }) {
  const whatsappMessage = encodeURIComponent(`Hello lolo's craving, I want to order: ${product.name}`);
  const whatsappHref = `https://wa.me/${storeConfig.whatsapp}?text=${whatsappMessage}`;

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] text-white shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-lavender/45 hover:bg-white/[0.09]">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-lavender/20 via-white/5 to-mint/10">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl transition duration-500 group-hover:scale-110">🍪</div>
        )}

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-wide text-mint backdrop-blur">
          {product.category?.name || 'Product'}
        </div>

        {!product.available && (
          <div className="absolute inset-0 grid place-items-center bg-black/60 text-xl font-black">
            Unavailable
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black leading-tight">{product.name}</h3>
          <p className="shrink-0 rounded-full bg-mint px-3 py-1 text-sm font-black text-plum">{money(product.price)}</p>
        </div>

        {product.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/55">{product.description}</p>}

        <div className="mt-5 grid gap-3">
          <button
            disabled={!product.available}
            onClick={() => addToCart(product)}
            className="rounded-full bg-lavender px-5 py-3 font-black text-plum transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
          >
            {product.available ? 'Add to cart' : 'Unavailable'}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-bold text-white/80 transition hover:border-mint/50 hover:bg-mint/10"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
