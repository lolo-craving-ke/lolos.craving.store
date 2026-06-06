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
    <article className="product-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f2eee9]">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#f4efe8] text-sm font-semibold text-[#746b78]">Product image</div>
        )}

        {!product.available && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 text-sm font-semibold text-[#2a232d] backdrop-blur-sm">
            Unavailable
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b88a5a]">{product.category?.name || 'Product'}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug text-[#2a232d]">{product.name}</h3>
          <p className="shrink-0 text-sm font-semibold text-[#3a243f]">{money(product.price)}</p>
        </div>

        {product.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#746b78]">{product.description}</p>}

        <div className="mt-5 grid gap-2">
          <button
            disabled={!product.available}
            onClick={() => addToCart(product)}
            className="rounded-md bg-[#3a243f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2f1d34] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            {product.available ? 'Add to Cart' : 'Unavailable'}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            className="rounded-md border border-[#d9d0dc] bg-white px-4 py-3 text-center text-sm font-semibold text-[#3a243f] transition hover:border-[#3a243f]"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
