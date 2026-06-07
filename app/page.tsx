import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { StoreAppHome } from '@/components/StoreAppHome';
import { CustomerLoginGate } from '@/components/CustomerLoginGate';

export default async function HomePage() {
  const [products, categories, offers] = await Promise.all([
    prisma.product.findMany({
      where: { available: true },
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { featured: 'desc' }, { createdAt: 'desc' }]
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        products: {
          where: { available: true },
          include: { category: true },
          orderBy: [{ sortOrder: 'asc' }, { featured: 'desc' }, { createdAt: 'desc' }]
        }
      }
    }),
    prisma.offer.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }]
    })
  ]);

  const safeProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    whatsappUrl: product.whatsappUrl,
    available: product.available,
    saleType: product.saleType,
    rating: product.rating,
    badge: product.badge,
    featured: product.featured,
    piecePrice: product.piecePrice,
    price250g: product.price250g,
    price500g: product.price500g,
    price1kg: product.price1kg,
    category: product.category ? { name: product.category.name } : null
  }));

  const safeCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    iconUrl: category.iconUrl,
    products: category.products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      whatsappUrl: product.whatsappUrl,
      available: product.available,
      saleType: product.saleType,
      rating: product.rating,
      badge: product.badge,
      featured: product.featured,
      piecePrice: product.piecePrice,
      price250g: product.price250g,
      price500g: product.price500g,
      price1kg: product.price1kg,
      category: product.category ? { name: product.category.name } : null
    }))
  }));

  const safeOffers = offers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    subtitle: offer.subtitle,
    label: offer.label,
    discountText: offer.discountText,
    buttonText: offer.buttonText,
    imageUrl: offer.imageUrl,
    link: offer.link
  }));

  return (
    <CustomerLoginGate>
      <Header />
      <main className="app-bg">
        <StoreAppHome products={safeProducts} categories={safeCategories} offers={safeOffers} />
      </main>
      <Footer />
    </CustomerLoginGate>
  );
}
