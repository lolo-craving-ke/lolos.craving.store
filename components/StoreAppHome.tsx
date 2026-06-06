'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { money } from '@/lib/money';
import { storeConfig } from '@/lib/config';

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

function addToCart(product: Product, quantity = 1) {
  const cart = JSON.parse(localStorage.getItem('lolos_cart') || '[]');
  const existing = cart.find((item: any) => item.id === product.id);

  if (existing) existing.quantity += quantity;
  else cart.push({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity });

  localStorage.setItem('lolos_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

function ProductImage({ product, large = false }: { product: Product; large?: boolean }) {
  if (product.imageUrl) {
    return <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />;
  }

  return (
    <div className="grid h-full w-full place-items-center bg-[#fff2df] p-5">
      <Image src="/logo.png" alt={product.name} width={220} height={180} className={`${large ? 'max-w-[260px]' : 'max-w-[120px]'} h-auto w-full object-contain opacity-80`} />
    </div>
  );
}

function CompactProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <article className="rounded-[24px] border border-[#eadfd0] bg-white p-3 shadow-[0_12px_32px_rgba(36,27,38,0.06)]">
      <button type="button" onClick={() => onOpen(product)} className="block w-full text-left">
        <div className="aspect-square overflow-hidden rounded-[20px] bg-[#fff2df]">
          <ProductImage product={product} />
        </div>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#df8e10]">{product.category?.name || 'Product'}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[44px] text-sm font-bold leading-5 text-[#241b26]">{product.name}</h3>
        <p className="mt-2 text-sm font-bold text-[#3a243f]">{money(product.price)}</p>
      </button>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f4a62a] text-xl font-bold text-white shadow-[0_10px_20px_rgba(244,166,42,0.22)]"
          aria-label={`Add ${product.name} to cart`}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="h-10 flex-1 rounded-2xl border border-[#eadfd0] text-xs font-bold text-[#3a243f]"
        >
          Details
        </button>
      </div>
    </article>
  );
}

function PopularCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="w-[150px] shrink-0 rounded-[24px] border border-[#eadfd0] bg-white p-3 text-left shadow-[0_12px_30px_rgba(36,27,38,0.06)] md:w-[180px]"
    >
      <div className="aspect-square overflow-hidden rounded-[20px] bg-[#fff2df]">
        <ProductImage product={product} />
      </div>
      <h3 className="mt-3 line-clamp-1 text-sm font-bold text-[#241b26]">{product.name}</h3>
      <p className="mt-1 text-sm font-bold text-[#f4a62a]">{money(product.price)}</p>
    </button>
  );
}

export function StoreAppHome({ products, groups }: { products: Product[]; groups: CategoryGroup[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const heroProduct = products.find((product) => product.imageUrl) || products[0];
  const popularProducts = products.slice(0, 8);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    let items = activeCategory === 'All'
      ? products
      : groups.find((group) => group.name === activeCategory)?.products || [];

    if (q) {
      items = items.filter((product) =>
        [product.name, product.description || '', product.category?.name || ''].join(' ').toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeCategory, groups, products, query]);

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setQuantity(1);
  }

  return (
    <div className="app-shell">
      <section className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-10">
        <div className="pt-2 md:pt-8">
          <p className="text-sm font-semibold text-[#7b717d]">Official store</p>
          <h1 className="mt-2 text-4xl font-black leading-[1.03] tracking-tight text-[#241b26] md:text-7xl">
            What would you like today?
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#7b717d] md:text-lg">
            Fresh Egyptian sweets, bakery treats and custom boxes from {storeConfig.name}.
          </p>

          <div className="mt-6 rounded-[24px] border border-[#eadfd0] bg-white p-2 shadow-[0_14px_38px_rgba(36,27,38,0.06)]">
            <div className="flex items-center gap-3 rounded-[18px] bg-[#fff8ef] px-4 py-3">
              <span className="h-4 w-4 rounded-full border-2 border-[#f4a62a]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cookies, kahk, kunafa..."
                className="w-full bg-transparent text-sm font-medium text-[#241b26] outline-none placeholder:text-[#7b717d]/55"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <a href="#menu" className="btn-orange">View Menu</a>
            <a
              href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I would like to place an order.")}`}
              target="_blank"
              className="btn-light"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="app-card overflow-hidden">
            <div className="aspect-[4/3] bg-[#fff2df]">
              {heroProduct ? <ProductImage product={heroProduct} large /> : <Image src="/logo.png" alt="lolo's craving" width={420} height={300} className="m-auto h-full w-full max-w-md object-contain p-12" />}
            </div>
            <div className="p-6">
              <p className="section-kicker">Fresh daily</p>
              <h2 className="mt-2 text-2xl font-black">Order online, pickup or request delivery.</h2>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="mt-8 md:mt-14">
        <div className="flex gap-2 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`app-chip ${activeCategory === 'All' ? 'app-chip-active' : 'app-chip-idle'}`}
          >
            All
          </button>
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveCategory(group.name)}
              className={`app-chip ${activeCategory === group.name ? 'app-chip-active' : 'app-chip-idle'}`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section id="popular" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="section-kicker">Recommended</p>
              <h2 className="text-2xl font-black text-[#241b26]">Popular today</h2>
            </div>
            <button type="button" onClick={() => setActiveCategory('All')} className="text-sm font-bold text-[#f4a62a]">See all</button>
          </div>

          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 [-webkit-overflow-scrolling:touch]">
            {popularProducts.map((product) => (
              <PopularCard key={product.id} product={product} onOpen={openProduct} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">{activeCategory === 'All' ? 'All products' : 'Category'}</p>
            <h2 className="text-2xl font-black text-[#241b26]">{activeCategory === 'All' ? 'Available products' : activeCategory}</h2>
          </div>
          <p className="text-sm font-semibold text-[#7b717d]">{filteredProducts.length} items</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="app-card p-8 text-center">
            <h3 className="text-xl font-bold">No products found</h3>
            <p className="mt-2 text-sm text-[#7b717d]">Try another category or search word.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <CompactProductCard key={product.id} product={product} onOpen={openProduct} />
            ))}
          </div>
        )}
      </section>

      <section id="custom" className="mt-10">
        <div className="rounded-[28px] bg-[#3a243f] p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4a62a]">Custom orders</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">Boxes for gifts, meetings and special occasions.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            Request custom sweet boxes for birthdays, office treats, family gatherings and events.
          </p>
          <a
            href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hello lolo's craving, I want to request a custom order.")}`}
            target="_blank"
            className="mt-5 inline-flex rounded-2xl bg-[#f4a62a] px-5 py-3 text-sm font-bold text-white"
          >
            Request Custom Order
          </a>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            className="absolute inset-0 bg-[#241b26]/45 backdrop-blur-[2px]"
            onClick={() => setSelectedProduct(null)}
            aria-label="Close product details"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[92vh] overflow-auto rounded-t-[34px] bg-white shadow-[0_-28px_90px_rgba(36,27,38,0.28)] md:bottom-8 md:left-1/2 md:right-auto md:w-[520px] md:-translate-x-1/2 md:rounded-[34px]">
            <div className="aspect-[4/3] bg-[#fff2df]">
              <ProductImage product={selectedProduct} large />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">{selectedProduct.category?.name || 'Product'}</p>
                  <h2 className="mt-2 text-3xl font-black text-[#241b26]">{selectedProduct.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-full border border-[#eadfd0] px-4 py-2 text-sm font-bold text-[#3a243f]"
                >
                  Close
                </button>
              </div>

              {selectedProduct.description && <p className="mt-4 leading-7 text-[#7b717d]">{selectedProduct.description}</p>}

              <div className="mt-5 flex items-center justify-between rounded-[24px] bg-[#fff8ef] p-4">
                <span className="text-sm font-semibold text-[#7b717d]">Price</span>
                <span className="text-2xl font-black text-[#3a243f]">{money(selectedProduct.price)}</span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-bold text-[#241b26]">Quantity</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid h-11 w-11 place-items-center rounded-2xl border border-[#eadfd0] text-xl font-bold">-</button>
                  <span className="min-w-8 text-center text-lg font-black">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="grid h-11 w-11 place-items-center rounded-2xl border border-[#eadfd0] text-xl font-bold">+</button>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    setSelectedProduct(null);
                  }}
                  className="rounded-2xl bg-[#f4a62a] px-5 py-4 text-sm font-black text-white"
                >
                  Add to Cart
                </button>
                <a
                  href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(`Hello lolo's craving, I want to order: ${selectedProduct.name}`)}`}
                  target="_blank"
                  className="rounded-2xl border border-[#eadfd0] px-5 py-4 text-center text-sm font-black text-[#3a243f]"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
