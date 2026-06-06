import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { storeConfig } from '@/lib/config';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HomeProductsByCategory } from '@/components/HomeProductsByCategory';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { available: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        products: {
          where: { available: true },
          include: { category: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
  ]);

  const heroProduct = products.find((product) => product.imageUrl);

  const uncategorizedProducts = products.filter((product) => !product.categoryId);
  const groups = [
    ...categories
      .filter((category) => category.products.length > 0)
      .map((category) => ({
        id: category.id,
        name: category.name,
        products: category.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          available: product.available,
          category: product.category ? { name: product.category.name } : null
        }))
      })),
    ...(uncategorizedProducts.length > 0
      ? [{
          id: 'uncategorized',
          name: 'Other Products',
          products: uncategorizedProducts.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            available: product.available,
            category: null
          }))
        }]
      : [])
  ];

  return (
    <>
      <ScrollReveal />
      <Header />

      <main className="page-bg">
        <section className="container-wide grid min-h-[560px] items-center gap-8 py-10 md:min-h-[650px] md:grid-cols-[1fr_0.95fr] md:gap-12 md:py-16">
          <div className="hero-reveal">
            <p className="section-kicker">Official online store</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-7xl">
              Fresh Egyptian sweets and bakery treats in Nairobi.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#746b78] md:text-lg md:leading-8">
              Order freshly prepared cookies, kahk, petit four, kunafa, donuts and custom boxes from {storeConfig.name}.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#products" className="btn-solid">View Products</a>
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
            <div className="overflow-hidden rounded-3xl border border-[#e8e1ea] bg-white shadow-[0_16px_45px_rgba(42,35,45,0.06)]">
              {heroProduct?.imageUrl ? (
                <img src={heroProduct.imageUrl} alt={heroProduct.name} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center bg-[#f3eee8] p-8 md:p-10">
                  <Image src="/logo.png" alt="lolo's craving" width={420} height={300} className="h-auto w-full max-w-xs object-contain opacity-90 md:max-w-md" />
                </div>
              )}
              <div className="border-t border-[#e8e1ea] bg-white p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a5a]">Fresh daily</p>
                <p className="mt-2 text-base font-semibold md:text-lg">Order online or contact us for custom boxes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide pb-8 md:pb-10">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              ['Freshly prepared', 'Daily bakery treats made with care.'],
              ['Delivery available', 'Delivery options across Nairobi.'],
              ['M-Pesa accepted', 'Simple and convenient payment.'],
              ['Custom orders', 'Gift boxes and event orders.']
            ].map(([title, text]) => (
              <div key={title} className="clean-card p-5 md:p-6">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#746b78]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="container-wide py-10 md:py-16">
          <div className="mb-6 flex flex-col justify-between gap-4 md:mb-8 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">All products</p>
              <h2 className="section-title mt-2">Browse by category</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746b78] md:text-base">
                Select a category to view its products directly on the homepage, or browse all available items.
              </p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#3a243f] hover:underline">Open full menu page</Link>
          </div>

          <HomeProductsByCategory groups={groups} />
        </section>

        <section id="about" className="container-wide py-10 md:py-16 reveal">
          <div className="grid gap-6 rounded-3xl border border-[#e8e1ea] bg-white p-6 shadow-[0_16px_45px_rgba(42,35,45,0.05)] md:grid-cols-[0.8fr_1.2fr] md:gap-8 md:p-12">
            <div>
              <p className="section-kicker">About the store</p>
              <h2 className="section-title mt-2">The official home of {storeConfig.name}</h2>
            </div>
            <div>
              <p className="text-base leading-8 text-[#746b78] md:text-lg">
                {storeConfig.name} is the official online store for fresh bakery treats and custom sweets in Nairobi. Customers can browse the menu, place orders online, request custom boxes, or contact us directly on WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <section id="custom" className="container-wide py-10 md:py-16 reveal">
          <div className="grid overflow-hidden rounded-3xl border border-[#e8e1ea] bg-white shadow-[0_16px_45px_rgba(42,35,45,0.05)] md:grid-cols-2">
            <div className="p-6 md:p-12">
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
            <div className="grid min-h-[240px] place-items-center bg-[#f3eee8] p-8 md:min-h-[320px] md:p-10">
              <Image src="/logo.png" alt="lolo's craving" width={360} height={260} className="h-auto w-full max-w-xs object-contain opacity-90 md:max-w-sm" />
            </div>
          </div>
        </section>

        <section className="container-wide py-10 md:py-16 reveal">
          <div className="rounded-3xl border border-[#e8e1ea] bg-white p-6 text-center shadow-[0_16px_45px_rgba(42,35,45,0.05)] md:p-8">
            <p className="section-kicker">Ready to order?</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Add products to the cart or chat with us on WhatsApp.</h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#products" className="btn-solid">View Products</a>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="btn-outline">WhatsApp Order</a>
            </div>
          </div>
        </section>

        <section className="container-wide pb-24 md:pb-20 reveal">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="clean-card p-6 md:p-8">
              <p className="section-kicker">Visit us</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Pickup and directions</h2>
              <p className="mt-4 leading-7 text-[#746b78]">Visit our store or place your order online for pickup and delivery options.</p>
              <a href={storeConfig.maps} target="_blank" className="btn-outline mt-6">Open Google Maps</a>
            </div>
            <div className="clean-card p-6 md:p-8">
              <p className="section-kicker">Contact</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Need help with your order?</h2>
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
