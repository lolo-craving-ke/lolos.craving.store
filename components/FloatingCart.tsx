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
        className="fixed bottom-[86px] right-4 z-[90] rounded-[22px] bg-[#3a243f] px-4 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(36,27,38,0.28)] transition hover:-translate-y-1 md:bottom-5 md:right-5"
        aria-label="Open cart"
      >
        <span className="flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-white/15">
            <span className="h-4 w-5 rounded-sm border-2 border-white border-t-0" />
            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-[#f4a62a] px-1 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </span>
          <span>السلة</span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[130]">
          <button
            type="button"
            aria-label="Close cart overlay"
            className="absolute inset-0 bg-[#241b26]/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-auto rounded-t-[34px] bg-white shadow-[0_-28px_90px_rgba(36,27,38,0.28)] md:bottom-6 md:left-6 md:right-auto md:w-[430px] md:rounded-[34px]">
            <div className="sticky top-0 z-10 border-b border-[#eadfd0] bg-white/95 p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#df8e10]">Shopping cart</p>
                  <h2 className="mt-1 text-2xl font-black text-[#241b26]">السلة</h2>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-[#eadfd0] px-4 py-2 text-sm font-bold text-[#3a243f]">Close</button>
              </div>
            </div>

            <div className="p-5">
              {items.length === 0 ? (
                <div className="rounded-[26px] border border-[#eadfd0] bg-[#fff8ef] p-6 text-center">
                  <h3 className="text-lg font-black text-[#241b26]">Your cart is empty</h3>
                  <p className="mt-2 text-sm leading-6 text-[#7b717d]">Add products from the menu.</p>
                  <button type="button" onClick={() => setOpen(false)} className="mt-4 rounded-2xl bg-[#f4a62a] px-5 py-3 text-sm font-black text-white">Continue shopping</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-[24px] border border-[#eadfd0] p-4">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-20 w-20 rounded-[20px] object-cover" />
                      ) : (
                        <div className="grid h-20 w-20 place-items-center rounded-[20px] bg-[#fff2df] text-xs font-bold text-[#7b717d]">Image</div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-bold text-[#241b26]">{item.name}</h3>
                        <p className="mt-1 text-sm font-bold text-[#f4a62a]">{money(item.price)}</p>

                        <div className="mt-3 flex items-center gap-2">
                          <button type="button" onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))} className="grid h-8 w-8 place-items-center rounded-xl border border-[#eadfd0] font-black">-</button>
                          <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                          <button type="button" onClick={() => save(items.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))} className="grid h-8 w-8 place-items-center rounded-xl border border-[#eadfd0] font-black">+</button>
                          <button type="button" onClick={() => save(items.filter((x) => x.id !== item.id))} className="ml-auto text-sm font-bold text-red-600">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-[26px] border border-[#eadfd0] bg-[#fff8ef] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#7b717d]">Total</span>
                      <span className="text-2xl font-black text-[#3a243f]">{money(total)}</span>
                    </div>

                    <div className="mt-5 grid gap-3">
                      <Link href="/checkout" onClick={() => setOpen(false)} className="rounded-2xl bg-[#f4a62a] px-5 py-4 text-center text-sm font-black text-white">Checkout</Link>
                      <Link href="/cart" onClick={() => setOpen(false)} className="rounded-2xl border border-[#eadfd0] bg-white px-5 py-4 text-center text-sm font-black text-[#3a243f]">Open full cart</Link>
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
