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
      <main className="app-bg min-h-screen px-4 py-16 pb-28 text-center">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-[#eadfcc] bg-white p-10 shadow-[0_15px_40px_rgba(34,27,24,0.07)]">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#fbf4e8] text-4xl text-[#9b6128]">✓</div>
          <h1 className="mt-5 text-4xl font-black">Order received</h1>
          <p className="mt-3 text-[#7e7169]">
            Your order number is <b>#{order}</b>. We will contact you soon.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a className="btn-primary" href={`https://wa.me/${storeConfig.whatsapp}?text=${text}`} target="_blank">
              Confirm on WhatsApp
            </a>
            <Link className="btn-light" href="/#products">
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
