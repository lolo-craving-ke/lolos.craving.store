'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { money } from '@/lib/money';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
};

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('lolos_cart') || '[]');
  } catch {
    return [];
  }
}

export function FloatingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  function refresh() {
    setItems(readCart());
  }

  function save(next: CartItem[]) {
    setItems(next);
    localStorage.setItem('lolos_cart', JSON.stringify(next));
    window.dispatchEvent(new Event('cart-updated'));
  }

  useEffect(() => {
    refresh();

    const onStorage = () => refresh();
    const onCartUpdate = () => refresh();

    window.addEventListener('storage', onStorage);
    window.addEventListener('cart-updated', onCartUpdate);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart-updated', onCartUpdate);
    };
  }, []);

  const totalQuantity = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[90] group"
        aria-label="Open cart"
      >
        <span className="absolute -inset-1 rounded-2xl bg-[#d8c7ea]/80 blur-lg opacity-80 transition group-hover:opacity-100" />
        <span className="relative flex items-center gap-3 rounded-2xl bg-[#3a243f] px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(42,35,45,0.24)] transition hover:-translate-y-1 hover:bg-[#2f1d34]">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/15">
            <span className="h-4 w-5 rounded-sm border-2 border-white border-t-0" />
            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-[#b88a5a] px-1 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-medium opacity-80">Your order</span>
            <span className="block">Cart</span>
          </span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Close cart overlay"
            className="absolute inset-0 bg-[#2a232d]/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[86vh] overflow-auto rounded-t-3xl bg-white shadow-[0_-24px_80px_rgba(42,35,45,0.25)] md:bottom-6 md:left-6 md:right-auto md:w-[430px] md:rounded-3xl">
            <div className="sticky top-0 z-10 border-b border-[#e8e1ea] bg-white/95 p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a5a]">Shopping cart</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#2a232d]">السلة</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[#d9d0dc] px-4 py-2 text-sm font-semibold text-[#3a243f]"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-5">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-[#e8e1ea] bg-[#faf7f2] p-6 text-center">
                  <h3 className="text-lg font-semibold text-[#2a232d]">Your cart is empty</h3>
                  <p className="mt-2 text-sm leading-6 text-[#746b78]">Add products from the homepage or products page.</p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-4 rounded-md bg-[#3a243f] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl border border-[#e8e1ea] p-4">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                      ) : (
                        <div className="grid h-20 w-20 place-items-center rounded-xl bg-[#f3eee8] text-xs font-semibold text-[#746b78]">Image</div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-[#2a232d]">{item.name}</h3>
                        <p className="mt-1 text-sm text-[#746b78]">{money(item.price)}</p>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))}
                            className="grid h-8 w-8 place-items-center rounded-md border border-[#d9d0dc] font-semibold"
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))}
                            className="grid h-8 w-8 place-items-center rounded-md border border-[#d9d0dc] font-semibold"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => save(items.filter((x) => x.id !== item.id))}
                            className="ml-auto text-sm font-semibold text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-[#e8e1ea] bg-[#faf7f2] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#746b78]">Total</span>
                      <span className="text-2xl font-semibold text-[#3a243f]">{money(total)}</span>
                    </div>

                    <div className="mt-5 grid gap-3">
                      <Link
                        href="/checkout"
                        onClick={() => setOpen(false)}
                        className="rounded-md bg-[#3a243f] px-5 py-3 text-center text-sm font-semibold text-white"
                      >
                        Checkout
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="rounded-md border border-[#d9d0dc] bg-white px-5 py-3 text-center text-sm font-semibold text-[#3a243f]"
                      >
                        Open full cart page
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
