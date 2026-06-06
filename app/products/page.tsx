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

      <main className="page-bg min-h-screen">
        <section className="container-wide py-16 reveal">
          <p className="section-kicker">Menu</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">Order from our store</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#746b78]">
            Browse available products, add items to cart, or place your order directly through WhatsApp.
          </p>
        </section>

        <section className="container-wide pb-20 reveal">
          {safeProducts.length === 0 ? (
            <div className="rounded-2xl border border-[#e8e1ea] bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-semibold">Products will appear here soon</h3>
              <p className="mt-3 text-[#746b78]">Add products from the admin dashboard.</p>
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
