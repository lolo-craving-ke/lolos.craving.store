import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: [{ available: 'desc' }, { createdAt: 'desc' }] });
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Products</h1>
        <p className="mt-2 text-ink/60">All prices are in KSH. Add your favorites to cart and checkout.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        {products.length === 0 && <div className="card mt-8 p-8 text-center text-ink/60">Products will appear here after you add them from admin.</div>}
      </main>
      <Footer />
    </>
  );
}
