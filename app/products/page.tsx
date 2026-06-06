import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { ProductsClient } from '@/components/ProductsClient';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ available: 'desc' }, { createdAt: 'desc' }]
  });

  const categories = Array.from(new Set(products.map((product) => product.category?.name).filter(Boolean))) as string[];

  const safeProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    available: product.available,
    category: product.category ? { name: product.category.name } : null
  }));

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#08070b] text-white">
        <section className="relative">
          <div className="absolute inset-0 hero-texture" />
          <div className="relative mx-auto max-w-7xl px-4 py-14">
            <p className="font-serif text-3xl italic text-lavender">Shop our menu</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight md:text-7xl">Premium Bakery Treats</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              Search, filter and order your favorite sweets. All prices are in KSH, with delivery and M-Pesa available.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          {safeProducts.length === 0 ? (
            <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-10 text-center shadow-2xl backdrop-blur">
              <h3 className="text-3xl font-black">Products will appear here soon</h3>
              <p className="mt-3 text-white/60">Add products from the admin dashboard.</p>
            </div>
          ) : (
            <ProductsClient products={safeProducts} categories={categories} />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
