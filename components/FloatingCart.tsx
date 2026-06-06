'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { money } from '@/lib/money';

type CartItem = {
  id: string;
  productId?: string;
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
    window.addEventListener('cart-updated', refresh);
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener('cart-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const totalQuantity = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[84px] left-4 z-[90] rounded-2xl bg-[#3a123f] px-4 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(34,27,24,0.28)] transition active:scale-95 md:bottom-5"
        aria-label="Open cart"
      >
        <span className="flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-white/15">
            <span className="h-4 w-5 rounded-sm border-2 border-white border-t-0" />
            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-[#f5a623] px-1 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </span>
          <span>Cart</span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[130]">
          <button type="button" className="absolute inset-0 bg-black/45" onClick={() => setOpen(false)} aria-label="Close cart" />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-auto rounded-t-[34px] bg-white md:bottom-6 md:left-6 md:right-auto md:w-[430px] md:rounded-[34px]">
            <div className="sticky top-0 border-b border-[#eadfcc] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Shopping cart</p>
                  <h2 className="mt-1 text-2xl font-black">Cart</h2>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-full border px-4 py-2 text-sm font-black">Close</button>
              </div>
            </div>

            <div className="p-5">
              {items.length === 0 ? (
                <div className="rounded-2xl bg-[#fbf4e8] p-6 text-center">
                  <h3 className="font-black">Your cart is empty</h3>
                  <p className="mt-2 text-sm text-[#7e7169]">Add products from the menu.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl border border-[#eadfcc] p-4">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                      ) : (
                        <div className="h-20 w-20 rounded-xl bg-[#fbf4e8]" />
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-black">{item.name}</h3>
                        <p className="text-sm font-black text-[#9b6128]">{money(item.price)}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))} className="h-8 w-8 rounded-lg border font-black">-</button>
                          <span className="font-black">{item.quantity}</span>
                          <button onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))} className="h-8 w-8 rounded-lg border font-black">+</button>
                          <button onClick={() => save(items.filter((x) => x.id !== item.id))} className="ml-auto text-sm font-black text-red-600">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-2xl bg-[#fbf4e8] p-5">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#7e7169]">Total</span>
                      <span className="text-2xl font-black text-[#9b6128]">{money(total)}</span>
                    </div>
                    <Link href="/checkout" onClick={() => setOpen(false)} className="mt-5 block rounded-2xl bg-[#9b6128] px-5 py-4 text-center text-sm font-black text-white">
                      Checkout
                    </Link>
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
