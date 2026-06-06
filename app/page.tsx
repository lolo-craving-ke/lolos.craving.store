import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StoreAppHome } from '@/components/StoreAppHome';

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

  const safeProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    available: product.available,
    category: product.category ? { name: product.category.name } : null
  }));

  const groups = categories
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
    }));

  const uncategorized = safeProducts.filter((product) => !product.category);
  if (uncategorized.length > 0) {
    groups.push({
      id: 'other',
      name: 'Other Products',
      products: uncategorized
    });
  }

  return (
    <>
      <ScrollReveal />
      <Header />
      <main className="page-bg">
        <StoreAppHome products={safeProducts} groups={groups} />
      </main>
      <Footer />
    </>
  );
}
