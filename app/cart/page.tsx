'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { money } from '@/lib/money';

type CartItem = { id: string; name: string; price: number; imageUrl?: string | null; quantity: number };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('lolos_cart') || '[]'));
  }, []);

  function save(next: CartItem[]) {
    setItems(next);
    localStorage.setItem('lolos_cart', JSON.stringify(next));
  }

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-black">Cart</h1>
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                {item.imageUrl ? <img src={item.imageUrl} className="h-20 w-20 rounded-2xl object-cover" alt={item.name} /> : <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lavender/20 text-3xl">🍪</div>}
                <div>
                  <h3 className="font-black">{item.name}</h3>
                  <p className="text-sm text-ink/60">{money(item.price)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-soft px-4 py-2" onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))}>-</button>
                <b>{item.quantity}</b>
                <button className="btn-soft px-4 py-2" onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))}>+</button>
                <button className="rounded-full px-3 py-2 text-sm font-bold text-red-600" onClick={() => save(items.filter((x) => x.id !== item.id))}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="card mt-8 p-8 text-center">
            <h2 className="text-2xl font-black">Your cart is empty</h2>
            <Link href="/products" className="btn-primary mt-5">Shop now</Link>
          </div>
        ) : (
          <div className="card mt-8 flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-ink/60">Total</p>
              <h2 className="text-3xl font-black text-plum">{money(total)}</h2>
            </div>
            <Link href="/checkout" className="btn-primary">Checkout</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
