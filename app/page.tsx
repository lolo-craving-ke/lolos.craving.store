import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { storeConfig } from '@/lib/config';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { available: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 4
  });

  const heroProduct = products.find((product) => product.imageUrl);

  return (
    <>
      <ScrollReveal />
      <Header />

      <main className="page-bg">
        <section className="container-wide grid min-h-[650px] items-center gap-12 py-16 md:grid-cols-[1fr_0.95fr]">
          <div className="hero-reveal">
            <p className="section-kicker">Official online store</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Fresh bakery treats and custom sweets in Nairobi.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#746b78]">
              Official store for freshly made cookies, kahk, petit four, kunafa, donuts and custom boxes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-solid">View Menu</Link>
              <a
                href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
                target="_blank"
                className="btn-muted"
              >
                Order on WhatsApp
              </a>
              <a href={storeConfig.maps} target="_blank" className="btn-outline">Get Directions</a>
            </div>
          </div>

          <div className="hero-reveal-delay">
            <div className="overflow-hidden rounded-3xl border border-[#e8e1ea] bg-white shadow-[0_22px_65px_rgba(42,35,45,0.08)]">
              {heroProduct?.imageUrl ? (
                <img src={heroProduct.imageUrl} alt={heroProduct.name} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center bg-[#f3eee8] p-10">
                  <Image src="/logo.png" alt="lolo's craving" width={420} height={300} className="h-auto w-full max-w-md object-contain opacity-90" />
                </div>
              )}
              <div className="border-t border-[#e8e1ea] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a5a]">Fresh daily</p>
                <p className="mt-2 text-lg font-semibold">Order online or contact us for custom boxes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide pb-10 reveal">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Freshly prepared', 'Daily bakery treats made with care.'],
              ['Delivery available', 'Delivery options across Nairobi.'],
              ['M-Pesa accepted', 'Simple and convenient payment.'],
              ['Custom orders', 'Gift boxes and event orders.']
            ].map(([title, text]) => (
              <div key={title} className="clean-card p-6">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#746b78]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide py-16 reveal">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Featured products</p>
              <h2 className="section-title mt-2">Customer favorites</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#3a243f] hover:underline">View all products</Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-[#e8e1ea] bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-semibold">No products yet</h3>
              <p className="mt-2 text-[#746b78]">Add products from the admin dashboard.</p>
              <Link href="/admin/login" className="btn-solid mt-5">Go to admin</Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-4">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </section>

        <section id="about" className="container-wide py-16 reveal">
          <div className="grid gap-8 rounded-3xl border border-[#e8e1ea] bg-white p-8 shadow-[0_22px_65px_rgba(42,35,45,0.06)] md:grid-cols-[0.8fr_1.2fr] md:p-12">
            <div>
              <p className="section-kicker">About the store</p>
              <h2 className="section-title mt-2">The official home of {storeConfig.name}</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-[#746b78]">
                lolo's craving is a bakery store in Nairobi offering fresh sweets, daily treats and custom boxes for gifts, meetings and special occasions. This website is the official page for viewing our menu, placing orders and contacting the store.
              </p>
            </div>
          </div>
        </section>

        <section id="custom" className="container-wide py-16 reveal">
          <div className="grid overflow-hidden rounded-3xl border border-[#e8e1ea] bg-white shadow-[0_22px_65px_rgba(42,35,45,0.06)] md:grid-cols-2">
            <div className="p-8 md:p-12">
              <p className="section-kicker">Custom orders</p>
              <h2 className="section-title mt-2">Boxes for gifts, meetings and special occasions.</h2>
              <p className="mt-5 max-w-xl leading-8 text-[#746b78]">
                Contact us for custom sweet boxes, family gatherings, office treats and event orders.
              </p>
              <a
                href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I want to request a custom order.")}`}
                target="_blank"
                className="btn-solid mt-7"
              >
                Request a Custom Order
              </a>
            </div>
            <div className="grid min-h-[320px] place-items-center bg-[#f3eee8] p-10">
              <Image src="/logo.png" alt="lolo's craving" width={360} height={260} className="h-auto w-full max-w-sm object-contain opacity-90" />
            </div>
          </div>
        </section>

        <section className="container-wide pb-20 reveal">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="clean-card p-8">
              <p className="section-kicker">Visit us</p>
              <h2 className="mt-2 text-3xl font-semibold">Pickup and directions</h2>
              <p className="mt-4 leading-7 text-[#746b78]">Visit our store or place your order online for pickup and delivery options.</p>
              <a href={storeConfig.maps} target="_blank" className="btn-outline mt-6">Open Google Maps</a>
            </div>
            <div className="clean-card p-8">
              <p className="section-kicker">Contact</p>
              <h2 className="mt-2 text-3xl font-semibold">Need help with your order?</h2>
              <p className="mt-4 leading-7 text-[#746b78]">Chat with us on WhatsApp for product questions, custom orders or delivery details.</p>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="btn-muted mt-6">Contact on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
