import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { storeConfig } from '@/lib/config';

export default function OrderSuccess({ searchParams }: { searchParams: { order?: string } }) {
  const order = searchParams.order || '';
  const text = encodeURIComponent(`Hello lolo's craving, I placed order #${order}. Please confirm my order.`);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="card p-10">
          <div className="text-6xl">✅</div>
          <h1 className="mt-4 text-4xl font-black">Order received</h1>
          <p className="mt-3 text-ink/60">Your order number is <b>#{order}</b>. We will contact you soon.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a className="btn-primary" href={`https://wa.me/${storeConfig.whatsapp}?text=${text}`} target="_blank">Confirm on WhatsApp</a>
            <Link className="btn-soft" href="/products">Continue shopping</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
