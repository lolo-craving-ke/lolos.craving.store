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

      <main className="min-h-screen overflow-hidden pastel-bg text-plum">
        <section className="relative soft-grid">
          <div className="relative mx-auto max-w-7xl px-4 py-14">
            <p className="font-serif text-3xl italic text-[#8f63c8]">Official menu</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight md:text-7xl">Order From Our Store</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-plum/60">
              Browse our fresh treats, add your favorites to cart, or order directly through WhatsApp. All prices are in KSH.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          {safeProducts.length === 0 ? (
            <div className="rounded-[36px] border border-[#efe3f7] bg-white/80 p-10 text-center shadow-sm backdrop-blur">
              <h3 className="text-3xl font-black">Products will appear here soon</h3>
              <p className="mt-3 text-plum/60">Add products from the admin dashboard.</p>
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
