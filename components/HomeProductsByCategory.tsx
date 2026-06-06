'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  available: boolean;
  category?: { name: string } | null;
};

type CategoryGroup = {
  id: string;
  name: string;
  products: Product[];
};

export function HomeProductsByCategory({ groups }: { groups: CategoryGroup[] }) {
  const validGroups = groups.filter((group) => group.products.length > 0);
  const [activeCategory, setActiveCategory] = useState('All');

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return validGroups.flatMap((group) => group.products);
    }

    return validGroups.find((group) => group.name === activeCategory)?.products || [];
  }, [validGroups, activeCategory]);

  const activeGroup = validGroups.find((group) => group.name === activeCategory);
  const totalProducts = validGroups.reduce((sum, group) => sum + group.products.length, 0);

  if (totalProducts === 0) {
    return (
      <div className="rounded-2xl border border-[#e8e1ea] bg-white p-8 text-center shadow-sm md:p-10">
        <h3 className="text-2xl font-semibold">No products yet</h3>
        <p className="mt-2 text-[#746b78]">Add products from the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 rounded-2xl border border-[#e8e1ea] bg-white p-3 shadow-[0_10px_30px_rgba(42,35,45,0.04)]">
        <div className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition md:px-5 ${
              activeCategory === 'All'
                ? 'border-[#3a243f] bg-[#3a243f] text-white'
                : 'border-[#d9d0dc] bg-white text-[#3a243f] hover:border-[#3a243f]'
            }`}
          >
            All products
          </button>

          {validGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveCategory(group.name)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition md:px-5 ${
                activeCategory === group.name
                  ? 'border-[#3a243f] bg-[#3a243f] text-white'
                  : 'border-[#d9d0dc] bg-white text-[#3a243f] hover:border-[#3a243f]'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">{activeCategory === 'All' ? 'All products' : 'Category'}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#2a232d] md:text-3xl">
            {activeCategory === 'All' ? 'Available products' : activeGroup?.name}
          </h3>
        </div>
        <p className="text-sm font-medium text-[#746b78]">{visibleProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
