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
    <article className="official-card group overflow-hidden">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#fff7fb] to-[#effffb]">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl transition duration-500 group-hover:scale-110">🍪</div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#7b4ca0] shadow-sm backdrop-blur">
          {product.category?.name || 'Product'}
        </div>

        {!product.available && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 text-xl font-black text-[#24182c] backdrop-blur-sm">
            Unavailable
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black leading-tight text-[#24182c]">{product.name}</h3>
          <p className="shrink-0 rounded-full bg-[#e8daff] px-3 py-1 text-sm font-black text-[#7b4ca0]">{money(product.price)}</p>
        </div>

        {product.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6e6175]">{product.description}</p>}

        <div className="mt-5 grid gap-3">
          <button
            disabled={!product.available}
            onClick={() => addToCart(product)}
            className="rounded-xl bg-[#b894ea] px-5 py-3 text-sm font-black text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            {product.available ? 'Add to Cart' : 'Unavailable'}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            className="rounded-xl bg-[#e6fbf6] px-5 py-3 text-center text-sm font-black text-[#2a7c6f] transition hover:bg-[#d3f7ee]"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
