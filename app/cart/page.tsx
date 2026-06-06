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
    window.dispatchEvent(new Event('cart-updated'));
  }

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <>
      <Header />
      <main className="page-bg min-h-screen">
        <section className="mx-auto max-w-5xl px-4 py-12">
          <p className="section-kicker">Your order</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Cart</h1>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#e8e1ea] bg-white p-4 shadow-[0_10px_30px_rgba(42,35,45,0.04)] md:flex md:items-center md:justify-between md:gap-4">
                <div className="flex items-center gap-4">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} className="h-20 w-20 rounded-xl object-cover" alt={item.name} />
                  ) : (
                    <div className="grid h-20 w-20 place-items-center rounded-xl bg-[#f3eee8] text-xs font-semibold text-[#746b78]">Image</div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#2a232d]">{item.name}</h3>
                    <p className="text-sm text-[#746b78]">{money(item.price)}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 md:mt-0">
                  <button className="rounded-md border border-[#d9d0dc] px-4 py-2 font-semibold" onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))}>-</button>
                  <b>{item.quantity}</b>
                  <button className="rounded-md border border-[#d9d0dc] px-4 py-2 font-semibold" onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))}>+</button>
                  <button className="px-3 py-2 text-sm font-semibold text-red-600" onClick={() => save(items.filter((x) => x.id !== item.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[#e8e1ea] bg-white p-8 text-center">
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <Link href="/#products" className="btn-solid mt-5">Shop now</Link>
            </div>
          ) : (
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#e8e1ea] bg-white p-6 shadow-[0_10px_30px_rgba(42,35,45,0.04)]">
              <div>
                <p className="text-sm text-[#746b78]">Total</p>
                <h2 className="text-3xl font-semibold text-[#3a243f]">{money(total)}</h2>
              </div>
              <Link href="/checkout" className="btn-solid">Checkout</Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
