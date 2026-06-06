'use client';
import Image from 'next/image';
import { money } from '@/lib/money';

type Product = { id: string; name: string; description?: string | null; price: number; imageUrl?: string | null; available: boolean; category?: { name: string } | null };

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
  return (
    <article className="card overflow-hidden">
      <div className="relative h-56 bg-lavender/20">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">🍪</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-plum">{product.category?.name || 'Product'}</p>
            <h3 className="mt-1 text-xl font-black">{product.name}</h3>
          </div>
          <p className="rounded-full bg-mint/40 px-3 py-1 text-sm font-black text-plum">{money(product.price)}</p>
        </div>
        {product.description && <p className="mt-3 line-clamp-2 text-sm text-ink/60">{product.description}</p>}
        <button disabled={!product.available} onClick={() => addToCart(product)} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:bg-gray-300">
          {product.available ? 'Add to cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  );
}
