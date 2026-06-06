import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { ProductsClient } from '@/components/ProductsClient';
import { ScrollReveal } from '@/components/ScrollReveal';

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
      <ScrollReveal />
      <Header />

      <main className="min-h-screen official-bg text-[#24182c]">
        <section className="mx-auto max-w-7xl px-4 py-16 section-reveal">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7b4ca0]">Official menu</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">Order From Our Store</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e6175]">
            Browse fresh bakery treats, add products to cart, or order directly through WhatsApp. All prices are in KSH.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 section-reveal reveal-delay-1">
          {safeProducts.length === 0 ? (
            <div className="rounded-[28px] border border-[#efe6f5] bg-white p-10 text-center shadow-sm">
              <h3 className="text-3xl font-black">Products will appear here soon</h3>
              <p className="mt-3 text-[#6e6175]">Add products from the admin dashboard.</p>
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
