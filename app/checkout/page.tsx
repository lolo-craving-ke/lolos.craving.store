'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { money } from '@/lib/money';

type CartItem = {
  id: string;
  productId?: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
};

function extractProductId(item: CartItem) {
  if (item.productId) return item.productId;
  return item.id.split('-')[0];
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('lolos_cart') || '[]'));
  }, []);

  async function submit(formData: FormData) {
    setLoading(true);

    const payload = {
      customerName: String(formData.get('customerName') || '').trim(),
      customerPhone: String(formData.get('customerPhone') || '').trim(),
      customerAddress: String(formData.get('customerAddress') || '').trim(),
      deliveryType: String(formData.get('deliveryType') || 'DELIVERY'),
      paymentMethod: String(formData.get('paymentMethod') || 'Cash'),
      notes: String(formData.get('notes') || '').trim(),
      items: items.map((item) => ({
        productId: extractProductId(item),
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return alert(data?.error || 'Could not place order. Please check your cart and details.');
    }

    const data = await res.json();
    localStorage.removeItem('lolos_cart');
    window.dispatchEvent(new Event('cart-updated'));
    router.push(`/order-success?order=${data.orderNumber}`);
  }

  return (
    <>
      <Header />
      <main className="app-bg min-h-screen px-4 py-8 pb-28">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-[28px] border border-[#eadfcc] bg-white p-6 shadow-[0_15px_40px_rgba(34,27,24,0.07)]">
            <h1 className="text-3xl font-black">Checkout</h1>
            <p className="mt-2 text-sm text-[#7e7169]">Complete your order details.</p>

            <form action={submit} className="mt-6 grid gap-4">
              <div>
                <label className="label">Customer name</label>
                <input required name="customerName" className="input mt-2" />
              </div>
              <div>
                <label className="label">Phone number</label>
                <input required name="customerPhone" className="input mt-2" placeholder="07..." />
              </div>
              <div>
                <label className="label">Delivery address</label>
                <textarea name="customerAddress" className="input mt-2" rows={3} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="label">Delivery type</label>
                  <select name="deliveryType" className="input mt-2">
                    <option value="DELIVERY">Delivery</option>
                    <option value="PICKUP">Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="label">Payment method</label>
                  <select name="paymentMethod" className="input mt-2">
                    <option>Cash</option>
                    <option>M-Pesa</option>
                    <option>Pay on delivery</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Notes</label>
                <textarea name="notes" className="input mt-2" rows={3} />
              </div>
              <button disabled={loading || items.length === 0} className="btn-primary disabled:bg-gray-300">
                {loading ? 'Placing order...' : 'Place order'}
              </button>
            </form>
          </section>

          <aside className="h-fit rounded-[28px] border border-[#eadfcc] bg-white p-6 shadow-[0_15px_40px_rgba(34,27,24,0.07)]">
            <h2 className="text-2xl font-black">Order summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <b>{money(item.price * item.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4 text-2xl font-black text-[#3a123f]">{money(total)}</div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
