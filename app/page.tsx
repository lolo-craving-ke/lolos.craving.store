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

      <main className="overflow-hidden pastel-bg text-plum">
        <section className="relative soft-grid min-h-[88vh]">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 md:grid-cols-[1fr_0.95fr] md:pt-20">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#efe3f7] bg-white/70 px-4 py-2 text-sm font-black text-[#4b235f] shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#BFEFEA]" />
                Official page & online ordering store
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-[#2B1B33] md:text-7xl">
                Fresh sweets,
                <span className="block bg-gradient-to-r from-[#8f63c8] via-[#BFA7F2] to-[#62b9ad] bg-clip-text font-serif italic text-transparent">
                  made with love.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-plum/65">
                Your sweet spot for cookies, kahk, petit four, bossomat, kunafa, donuts and custom treats in Nairobi.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\'s craving, I would like to place an order.')}`} target="_blank" className="btn-mint">
                  Order Now <span>→</span>
                </a>
                <Link href="/products" className="btn-lavender">View Menu</Link>
                <a href={storeConfig.maps} target="_blank" className="btn-outline-soft">Visit Our Store</a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 text-sm font-bold text-plum/70 md:grid-cols-4">
                <div className="info-pill"><span>🍪</span> Fresh Daily</div>
                <div className="info-pill"><span>🚚</span> Delivery</div>
                <div className="info-pill"><span>💳</span> M-Pesa</div>
                <div className="info-pill"><span>📍</span> Pickup</div>
              </div>
            </div>

            <div className="relative reveal-delay">
              <div className="float-card relative mx-auto max-w-[560px] rounded-[48px] border border-[#efe3f7] bg-white/65 p-7 shadow-[0_30px_100px_rgba(75,35,95,0.12)] backdrop-blur">
                <div className="absolute -right-3 top-12 z-10 rounded-full bg-[#FFDDE8] px-7 py-7 text-center font-serif text-xl font-bold text-[#4b235f] shadow-sm">
                  Sweet<br />Moments<br />Daily
                </div>

                <div className="absolute bottom-8 left-8 z-10 rounded-3xl border border-[#efe3f7] bg-white/85 px-5 py-4 text-sm font-bold text-plum/70 shadow-sm backdrop-blur">
                  💬 Need help choosing?<br />Chat with our team
                </div>

                <Image
                  src="/logo.png"
                  alt="lolo's craving"
                  width={720}
                  height={720}
                  priority
                  className="relative z-[1] mx-auto h-auto w-full object-contain drop-shadow-[0_24px_45px_rgba(75,35,95,0.12)]"
                />
              </div>
            </div>
          </div>

          <div id="delivery" className="relative mx-auto max-w-6xl px-4 pb-12">
            <div className="grid gap-4 rounded-[32px] border border-[#efe3f7] bg-white/70 p-4 shadow-sm backdrop-blur md:grid-cols-4">
              <div className="service-soft"><span>🚚</span><div><b>Delivery Available</b><p className="mt-1 text-sm text-plum/55">Fresh sweets delivered to your door.</p></div></div>
              <div className="service-soft"><span>💳</span><div><b>Lipa na M-Pesa</b><p className="mt-1 text-sm text-plum/55">Simple and secure payment.</p></div></div>
              <div className="service-soft"><span>💬</span><div><b>Chat Support</b><p className="mt-1 text-sm text-plum/55">Ask before you order.</p></div></div>
              <div className="service-soft"><span>📍</span><div><b>Pickup Ready</b><p className="mt-1 text-sm text-plum/55">Collect directly from the shop.</p></div></div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[36px] border border-[#efe3f7] bg-white/75 p-8 shadow-sm backdrop-blur">
              <p className="font-serif text-3xl italic text-[#8f63c8]">About us</p>
              <h2 className="mt-2 text-4xl font-black">The official home of {storeConfig.name}</h2>
            </div>
            <div className="rounded-[36px] border border-[#efe3f7] bg-white/75 p-8 shadow-sm backdrop-blur">
              <p className="text-lg leading-8 text-plum/65">
                We prepare fresh sweets and bakery treats with love, perfect for daily cravings, family gatherings and special occasions. You can browse our menu, add products to cart, order through WhatsApp, or visit our store.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="overflow-hidden rounded-[34px] border border-[#efe3f7] bg-gradient-to-r from-[#fff] via-[#fff5fb] to-[#effffb] p-6 shadow-sm md:flex md:items-center md:justify-between">
            <div>
              <p className="font-serif text-3xl italic text-[#8f63c8]">Custom Orders</p>
              <h2 className="mt-2 text-3xl font-black">Boxes, events and special occasions</h2>
              <p className="mt-2 text-plum/60">Tell us what you need and our team will help you choose the best sweets.</p>
            </div>
            <a href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Hello lolo\'s craving, I want to request a custom order.')}`} target="_blank" className="btn-mint mt-6 md:mt-0">
              Request Custom Order
            </a>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-serif text-3xl italic text-[#8f63c8]">Customer</p>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">Favorites</h2>
              <p className="mt-3 max-w-lg text-plum/55">Popular treats from our online menu.</p>
            </div>
            <Link href="/products" className="group font-black text-[#8f63c8]">
              View all products <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[36px] border border-[#efe3f7] bg-white/80 p-10 text-center shadow-sm backdrop-blur">
              <h3 className="text-3xl font-black">No products yet</h3>
              <p className="mt-3 text-plum/60">Add products from the admin dashboard after deployment.</p>
              <Link href="/admin/login" className="btn-lavender mt-6">Go to admin</Link>
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
          <div className="rounded-[34px] border border-[#efe3f7] bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-serif text-2xl italic text-[#8f63c8]">Shop by</p>
                <h2 className="text-3xl font-black">Categories</h2>
              </div>
              <Link href="/products" className="text-sm font-black text-[#62b9ad]">Explore menu</Link>
            </div>

            {categories.length === 0 ? (
              <p className="text-plum/55">Create categories from admin dashboard.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href="/products"
                    className="rounded-3xl border border-[#efe3f7] bg-white p-5 font-black text-plum/80 shadow-sm transition hover:-translate-y-1 hover:border-[#BFA7F2] hover:bg-[#fff5fb]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8">
            <p className="font-serif text-3xl italic text-[#8f63c8]">What customers say</p>
            <h2 className="text-4xl font-black">Loved by sweet lovers</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Fresh and delicious sweets. The packaging looked beautiful!', '★★★★★', 'Nairobi Customer'],
              ['Fast delivery and very easy to order on WhatsApp.', '★★★★★', 'Happy Client'],
              ['The cookies and kahk taste premium and homemade.', '★★★★★', 'Regular Customer']
            ].map(([text, stars, name]) => (
              <div key={text} className="rounded-[30px] border border-[#efe3f7] bg-white/75 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                <p className="text-xl text-[#8f63c8]">{stars}</p>
                <p className="mt-4 leading-7 text-plum/65">“{text}”</p>
                <p className="mt-5 font-black text-[#4b235f]">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24">
          <div className="rounded-[36px] border border-[#efe3f7] bg-white/75 p-8 shadow-sm backdrop-blur md:flex md:items-center md:justify-between">
            <div>
              <p className="font-serif text-3xl italic text-[#8f63c8]">Visit Our Store</p>
              <h2 className="mt-2 text-4xl font-black">Pickup and delivery available</h2>
              <p className="mt-3 max-w-xl text-plum/60">Open Google Maps to visit us, or chat with our team to place your order.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 md:mt-0">
              <a href={storeConfig.maps} target="_blank" className="btn-outline-soft">Open Google Maps</a>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="btn-mint">Talk to us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
