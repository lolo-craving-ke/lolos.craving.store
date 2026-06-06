import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { storeConfig } from '@/lib/config';

export default async function HomePage() {
  const products = await prisma.product.findMany({ where: { available: true }, include: { category: true }, orderBy: { createdAt: 'desc' }, take: 6 });
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-mint/40 px-4 py-2 text-sm font-bold text-plum">Delivery available • M-Pesa accepted</p>
            <h1 className="text-5xl font-black leading-tight text-ink md:text-7xl">Fresh sweets for every craving.</h1>
            <p className="mt-6 max-w-xl text-lg text-ink/65">Order cookies, kahk, petit four, bossomat, kunafa, donuts and fresh bakery treats directly from {storeConfig.name}.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">Shop products</Link>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="btn-soft">Order on WhatsApp</a>
            </div>
          </div>
          <div className="card flex items-center justify-center p-8">
            <Image src="/logo.jpg" alt="lolo's craving" width={520} height={520} className="rounded-3xl" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-bold text-plum">Fresh picks</p>
              <h2 className="text-3xl font-black">Latest products</h2>
            </div>
            <Link href="/products" className="font-bold text-plum">View all</Link>
          </div>
          {products.length === 0 ? (
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-black">No products yet</h3>
              <p className="mt-2 text-ink/60">Add products from the admin dashboard after deployment.</p>
              <Link href="/admin/login" className="btn-primary mt-5">Go to admin</Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
