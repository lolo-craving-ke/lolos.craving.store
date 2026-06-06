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
  const [activeCategory, setActiveCategory] = useState('All');

  const visibleGroups = useMemo(() => {
    if (activeCategory === 'All') return groups;
    return groups.filter((group) => group.name === activeCategory);
  }, [groups, activeCategory]);

  const totalProducts = groups.reduce((sum, group) => sum + group.products.length, 0);

  if (groups.length === 0 || totalProducts === 0) {
    return (
      <div className="rounded-2xl border border-[#e8e1ea] bg-white p-10 text-center shadow-sm">
        <h3 className="text-2xl font-semibold">No products yet</h3>
        <p className="mt-2 text-[#746b78]">Add products from the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-[116px] z-30 -mx-4 mb-8 border-y border-[#e8e1ea] bg-[#faf7f2]/92 px-4 py-3 backdrop-blur">
        <div className="container-wide px-0">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === 'All'
                  ? 'border-[#3a243f] bg-[#3a243f] text-white'
                  : 'border-[#d9d0dc] bg-white text-[#3a243f] hover:border-[#3a243f]'
              }`}
            >
              All products
            </button>

            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveCategory(group.name)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
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
      </div>

      <div className="space-y-14">
        {visibleGroups.map((group) => (
          <section key={group.id} id={`category-${group.id}`} className="scroll-mt-40">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="section-kicker">Category</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[#2a232d]">{group.name}</h3>
              </div>
              <p className="text-sm font-medium text-[#746b78]">{group.products.length} products</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {group.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
