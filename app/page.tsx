import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { storeConfig } from '@/lib/config';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { available: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    take: 8
  });

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#08070b] text-white">
        <section className="relative min-h-[92vh]">
          <div className="absolute inset-0 hero-texture" />
          <div className="absolute left-[-160px] top-24 h-80 w-80 rounded-full bg-lavender/30 blur-[120px]" />
          <div className="absolute right-[-180px] top-20 h-96 w-96 rounded-full bg-mint/20 blur-[130px]" />
          <div className="absolute bottom-0 left-1/2 h-64 w-[900px] -translate-x-1/2 rounded-full bg-plum/20 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 md:grid-cols-[0.95fr_1.05fr] md:pt-20">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mint shadow-[0_0_30px_rgba(202,255,239,0.08)] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_18px_#C8F7E7]" />
                Fresh Egyptian sweets in Nairobi
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Handmade Sweets,
                <span className="block bg-gradient-to-r from-lavender via-[#f5d6ff] to-mint bg-clip-text font-serif italic text-transparent">
                  Fresh Daily.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Order cookies, kahk, petit four, bossomat, kunafa, donuts and premium bakery treats from {storeConfig.name}.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\'s craving, I would like to place an order.')}`} target="_blank" className="btn-glow">
                  Order on WhatsApp <span>→</span>
                </a>
                <Link href="/products" className="btn-glass">View menu</Link>
                <Link href="/products" className="btn-glass">Shop now</Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 text-sm text-white/70 md:grid-cols-4">
                <div className="feature-chip"><span>✦</span> Fresh Daily</div>
                <div className="feature-chip"><span>🚚</span> Delivery</div>
                <div className="feature-chip"><span>💳</span> M-Pesa</div>
                <div className="feature-chip"><span>📍</span> Pickup</div>
              </div>
            </div>

            <div className="relative reveal-delay">
              <div className="float-card relative mx-auto aspect-square max-w-[560px] rounded-[48px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
                <div className="absolute -right-6 top-12 z-10 rounded-full bg-lavender px-8 py-8 text-center font-serif text-xl text-plum shadow-[0_0_45px_rgba(217,183,255,0.45)]">
                  Made<br />Fresh<br />Daily
                </div>

                <div className="absolute bottom-10 left-8 z-10 rounded-3xl border border-white/10 bg-black/35 px-5 py-4 text-sm text-white/80 backdrop-blur">
                  🚚 Delivery available<br />M-Pesa accepted
                </div>

                <div className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-white/10 to-white/0" />
                <Image
                  src="/logo.jpg"
                  alt="lolo's craving"
                  width={720}
                  height={720}
                  priority
                  className="relative z-[1] h-full w-full rounded-[36px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.75)]"
                />
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-12">
            <div className="grid gap-4 rounded-[32px] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur md:grid-cols-4">
              <div className="service-card"><span>🚚</span><div><b>Delivery Available</b><p>Fresh sweets delivered to your door.</p></div></div>
              <div className="service-card"><span>💳</span><div><b>Lipa na M-Pesa</b><p>Simple and secure payment.</p></div></div>
              <div className="service-card"><span>💬</span><div><b>Chat Support</b><p>Talk to us before ordering.</p></div></div>
              <div className="service-card"><span>📍</span><div><b>Pickup Ready</b><p>Collect directly from the shop.</p></div></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="overflow-hidden rounded-[34px] border border-lavender/20 bg-gradient-to-r from-lavender/20 via-white/[0.06] to-mint/10 p-6 shadow-[0_30px_100px_rgba(217,183,255,0.12)] backdrop-blur md:flex md:items-center md:justify-between">
            <div>
              <p className="font-serif text-3xl italic text-lavender">Today&apos;s Offer</p>
              <h2 className="mt-2 text-3xl font-black">Ask about our fresh daily deals</h2>
              <p className="mt-2 text-white/60">Special boxes, party orders and seasonal treats available on request.</p>
            </div>
            <a href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\'s craving, what offers are available today?')}`} target="_blank" className="btn-glow mt-6 md:mt-0">
              Ask on WhatsApp
            </a>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-serif text-3xl italic text-lavender">Customer</p>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">Favorites</h2>
              <p className="mt-3 max-w-lg text-white/55">Handpicked best sellers ready for your next craving.</p>
            </div>
            <Link href="/products" className="group font-bold text-lavender">
              View all products <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-10 text-center shadow-2xl backdrop-blur">
              <h3 className="text-3xl font-black">No products yet</h3>
              <p className="mt-3 text-white/60">Add products from the admin dashboard after deployment.</p>
              <Link href="/admin/login" className="btn-glow mt-6">Go to admin</Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="product-animate">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-serif text-2xl italic text-lavender">Shop by</p>
                <h2 className="text-3xl font-black">Categories</h2>
              </div>
              <Link href="/products" className="text-sm font-bold text-mint">Explore menu</Link>
            </div>

            {categories.length === 0 ? (
              <p className="text-white/55">Create categories from admin dashboard.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href="/products"
                    className="rounded-3xl border border-white/10 bg-black/20 p-5 font-bold text-white/80 transition hover:-translate-y-1 hover:border-lavender/50 hover:bg-lavender/10"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Fresh and delicious sweets. The packaging looked beautiful!', '★★★★★', 'Nairobi Customer'],
              ['Fast delivery and very easy to order on WhatsApp.', '★★★★★', 'Happy Client'],
              ['The cookies and kahk taste premium and homemade.', '★★★★★', 'Regular Customer']
            ].map(([text, stars, name]) => (
              <div key={text} className="rounded-[30px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-lavender/40">
                <p className="text-xl text-mint">{stars}</p>
                <p className="mt-4 leading-7 text-white/70">“{text}”</p>
                <p className="mt-5 font-black text-lavender">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur md:flex md:items-center md:justify-between">
            <div>
              <p className="font-serif text-3xl italic text-lavender">Visit Our Store</p>
              <h2 className="mt-2 text-4xl font-black">Pickup and delivery available</h2>
              <p className="mt-3 max-w-xl text-white/60">Open Google Maps to visit us, or chat with our team to place your order.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 md:mt-0">
              <a href={storeConfig.maps} target="_blank" className="btn-glass">Open Google Maps</a>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="btn-glow">Talk to us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
