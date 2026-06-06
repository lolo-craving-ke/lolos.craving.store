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

export function ProductsClient({ products, categories }: { products: Product[]; categories: string[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let items = [...products];

    if (category !== 'All') items = items.filter((product) => product.category?.name === category);

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter((product) =>
        [product.name, product.description || '', product.category?.name || ''].join(' ').toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') items.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') items.sort((a, b) => b.price - a.price);
    if (sort === 'available') items.sort((a, b) => Number(b.available) - Number(a.available));

    return items;
  }, [products, category, query, sort]);

  return (
    <div>
      <div className="rounded-[28px] border border-[#efe6f5] bg-white p-4 shadow-[0_14px_45px_rgba(36,24,44,0.07)]">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_220px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cookies, kahk, kunafa..."
            className="modern-input"
          />

          <select value={category} onChange={(event) => setCategory(event.target.value)} className="modern-select">
            <option>All</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={sort} onChange={(event) => setSort(event.target.value)} className="modern-select">
            <option value="newest">Newest first</option>
            <option value="available">Available first</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm font-black text-[#6e6175]">{filtered.length} product{filtered.length === 1 ? '' : 's'} found</p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[28px] border border-[#efe6f5] bg-white p-10 text-center text-[#6e6175]">
          No products match your search.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
