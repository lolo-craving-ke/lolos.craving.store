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

  return (
    <>
      <ScrollReveal />
      <Header />

      <main className="official-bg text-[#24182c]">
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-20">
            <div className="hero-in">
              <p className="inline-flex rounded-full border border-[#efe6f5] bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#7b4ca0] shadow-sm">
                Official store & online ordering
              </p>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
                Fresh sweets,
                <span className="block font-serif italic text-[#9b72d0]">made with love.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6e6175]">
                Order your favorite cookies, kahk, petit four, kunafa, donuts and custom boxes from {storeConfig.name} in Nairobi.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-purple">View Menu</Link>
                <a href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\\'s craving, I would like to place an order.')}`} target="_blank" className="btn-mint">
                  Order on WhatsApp
                </a>
                <a href={storeConfig.maps} target="_blank" className="btn-white">Visit Our Store</a>
              </div>
            </div>

            <div className="hero-in-delay">
              <div className="relative mx-auto max-w-[560px]">
                <div className="absolute inset-8 rounded-full bg-[#e8daff] opacity-70 blur-2xl" />
                <div className="logo-float relative rounded-full border border-[#efe6f5] bg-white/65 p-10 shadow-[0_24px_90px_rgba(36,24,44,0.10)] backdrop-blur">
                  <Image
                    src="/logo.png"
                    alt="lolo's craving"
                    width={640}
                    height={640}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-8 section-reveal reveal-delay-1">
            <div className="service-row grid md:grid-cols-4">
              <div className="service-item"><span className="service-icon">🧁</span><div><b>Fresh Daily</b><p className="mt-1 text-sm text-[#6e6175]">Made every day with love</p></div></div>
              <div className="service-item"><span className="service-icon">🛵</span><div><b>Delivery Available</b><p className="mt-1 text-sm text-[#6e6175]">Fast and reliable delivery</p></div></div>
              <div className="service-item"><span className="service-icon">📱</span><div><b>M-Pesa Accepted</b><p className="mt-1 text-sm text-[#6e6175]">Secure and easy payments</p></div></div>
              <div className="service-item"><span className="service-icon">🏬</span><div><b>Pickup Available</b><p className="mt-1 text-sm text-[#6e6175]">Pick up from our store</p></div></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 section-reveal">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b894ea]">Customer Favorites</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Our bestsellers</h2>
            </div>
            <Link href="/products" className="font-black text-[#7b4ca0]">View all products →</Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[28px] border border-[#efe6f5] bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-black">No products yet</h3>
              <p className="mt-2 text-[#6e6175]">Add products from the admin dashboard.</p>
              <Link href="/admin/login" className="btn-purple mt-5">Go to admin</Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-4">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </section>

        <section id="custom" className="mx-auto max-w-7xl px-4 py-10 section-reveal">
          <div className="grid overflow-hidden rounded-[30px] border border-[#efe6f5] bg-gradient-to-r from-white via-[#fbf6ff] to-[#effffb] shadow-[0_18px_65px_rgba(36,24,44,0.08)] md:grid-cols-[1fr_0.9fr]">
            <div className="p-8 md:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7b4ca0]">Made for every occasion</p>
              <h2 className="mt-4 text-4xl font-black">Custom orders for your special moments</h2>
              <p className="mt-4 max-w-lg leading-8 text-[#6e6175]">
                We create beautiful sweet boxes for birthdays, weddings, corporate gifts and celebrations.
              </p>
              <a href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\\'s craving, I want to request a custom order.')}`} target="_blank" className="btn-purple mt-7">
                Request Custom Order
              </a>
            </div>
            <div className="grid min-h-[260px] place-items-center bg-[#e8daff]/45 p-8">
              <Image src="/logo.png" alt="lolo's craving custom orders" width={360} height={360} className="max-h-72 w-auto object-contain" />
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-14 section-reveal">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="official-card p-8">
              <h3 className="text-2xl font-black">About {storeConfig.name}</h3>
              <p className="mt-4 leading-7 text-[#6e6175]">
                We are a bakery brand in Nairobi creating fresh sweets, gift boxes and everyday treats with quality ingredients.
              </p>
            </div>

            <div className="official-card p-8">
              <h3 className="text-2xl font-black">Visit our store</h3>
              <p className="mt-4 leading-7 text-[#6e6175]">Pickup is available from our location. Open Google Maps for directions.</p>
              <a href={storeConfig.maps} target="_blank" className="btn-purple mt-6">Open Google Maps</a>
            </div>

            <div className="official-card p-8">
              <h3 className="text-2xl font-black">Stay connected</h3>
              <p className="mt-4 leading-7 text-[#6e6175]">Need help choosing sweets? Chat with our team before ordering.</p>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="btn-mint mt-6">Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
