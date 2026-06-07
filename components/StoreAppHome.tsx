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
  whatsappUrl?: string | null;
  available: boolean;
  saleType: string;
  rating: number;
  badge?: string | null;
  featured: boolean;
  piecePrice?: number | null;
  price250g?: number | null;
  price500g?: number | null;
  price1kg?: number | null;
  category?: { name: string } | null;
};

type Category = {
  id: string;
  name: string;
  iconUrl?: string | null;
  products: Product[];
};

type Offer = {
  id: string;
  title: string;
  subtitle?: string | null;
  label?: string | null;
  discountText?: string | null;
  buttonText: string;
  imageUrl?: string | null;
  link: string;
};

function productWhatsappLink(product: Product) {
  if (product.whatsappUrl && product.whatsappUrl.trim()) return product.whatsappUrl.trim();
  const text = encodeURIComponent(`Hello lolo's craving, I want to order: ${product.name}`);
  return `https://wa.me/${storeConfig.whatsapp}?text=${text}`;
}

function cartItemId(product: Product, weight?: number) {
  return weight ? `${product.id}-${weight}kg` : product.id;
}

function addToCart(product: Product, quantity = 1, weight?: number, selectedPrice?: number) {
  const cart = JSON.parse(localStorage.getItem('lolos_cart') || '[]');
  const itemId = cartItemId(product, weight);
  const itemName = weight ? `${product.name} - ${weight} Kg` : product.name;
  const itemPrice = selectedPrice || product.piecePrice || product.price;
  const existing = cart.find((item: any) => item.id === itemId);

  if (existing) existing.quantity += quantity;
  else cart.push({ id: itemId, productId: product.id, name: itemName, price: itemPrice, imageUrl: product.imageUrl, quantity });

  localStorage.setItem('lolos_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

function readCartQuantity(product: Product) {
  if (typeof window === 'undefined') return { quantity: 0, total: 0 };
  try {
    const cart = JSON.parse(localStorage.getItem('lolos_cart') || '[]');
    const related = cart.filter((item: any) => item.productId === product.id || item.id === product.id);
    return {
      quantity: related.reduce((sum: number, item: any) => sum + item.quantity, 0),
      total: related.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    };
  } catch {
    return { quantity: 0, total: 0 };
  }
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(Number(rating || 0));
  return (
    <span className="inline-flex items-center gap-0.5 text-[#f5a623]" aria-label={`Rating ${rating}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>{index < rounded ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

function ProductImage({ src, name }: { src?: string | null; name: string }) {
  if (src) return <img src={src} alt={name} className="h-full w-full object-cover" />;
  return (
    <div className="grid h-full w-full place-items-center bg-[#fbf4e8] p-4">
      <Image src="/logo.png" alt={name} width={180} height={140} className="h-auto w-full max-w-[120px] object-contain opacity-80" />
    </div>
  );
}

function productBasePrice(product: Product) {
  if (product.saleType === 'WEIGHT') return product.price1kg || product.price;
  return product.piecePrice || product.price;
}

function ProductCard({ product, onOpen, cartVersion }: { product: Product; onOpen: (product: Product) => void; cartVersion: number }) {
  const cart = readCartQuantity(product);
  const hasInCart = cart.quantity > 0;

  return (
    <article className="card-pop overflow-hidden rounded-[24px] bg-white shadow-[0_12px_32px_rgba(34,27,24,0.08)]">
      <button type="button" onClick={() => onOpen(product)} className="tap-animate block w-full text-left">
        <div className="relative aspect-[1.55] overflow-hidden bg-[#fbf4e8]">
          <ProductImage src={product.imageUrl} name={product.name} />
          <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-black text-[#221b18]">
            <Stars rating={product.rating} />
          </div>
          {product.badge && <div className="absolute right-2 top-2 rounded-full bg-[#f5a623] px-2 py-1 text-[10px] font-black text-white">{product.badge}</div>}
        </div>
        <div className="p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#9b6128]">{product.category?.name || 'Product'}</p>
          <h3 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-black leading-5">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-black text-[#9b6128]">{money(productBasePrice(product))}{product.saleType === 'WEIGHT' ? ' / Kg' : ''}</p>
            <span className="rounded-full bg-[#fbf4e8] px-2 py-1 text-[11px] font-bold text-[#7e7169]">{product.saleType === 'WEIGHT' ? 'Weight' : 'Qty'}</span>
          </div>
          {hasInCart && (
            <div className="mt-2 rounded-xl bg-[#fff4df] px-3 py-2 text-xs font-black text-[#9b6128]">
              In cart: {cart.quantity} • {money(cart.total)}
            </div>
          )}
        </div>
      </button>
      <div className="grid gap-2 px-3 pb-3">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="tap-animate w-full rounded-2xl bg-[#9b6128] px-4 py-3 text-sm font-black text-white"
        >
          Add
        </button>
        <a
          href={productWhatsappLink(product)}
          target="_blank"
          className="tap-animate w-full rounded-2xl border border-[#eadfcc] px-4 py-3 text-center text-sm font-black text-[#221b18]"
        >
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}

function weightOptions(product: Product) {
  return [
    { label: '0.25 Kg', weight: 0.25, price: product.price250g || Math.round((product.price1kg || product.price) * 0.25) },
    { label: '0.5 Kg', weight: 0.5, price: product.price500g || Math.round((product.price1kg || product.price) * 0.5) },
    { label: '1 Kg', weight: 1, price: product.price1kg || product.price },
    { label: '2 Kg', weight: 2, price: (product.price1kg || product.price) * 2 },
    { label: '4 Kg', weight: 4, price: (product.price1kg || product.price) * 4 }
  ];
}

export function StoreAppHome({ products, categories, offers }: { products: Product[]; categories: Category[]; offers: Offer[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(1);
  const [selectedWeightPrice, setSelectedWeightPrice] = useState(0);
  const [cartVersion, setCartVersion] = useState(0);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = activeCategory === 'All'
      ? products
      : categories.find((category) => category.name === activeCategory)?.products || [];

    if (q) {
      items = items.filter((product) =>
        [product.name, product.description || '', product.category?.name || ''].join(' ').toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeCategory, products, categories, query]);

  const fallbackOffer = {
    id: 'fallback',
    title: 'Fresh sweets offer',
    subtitle: 'Order your favorite bakery treats today',
    label: 'Limited time',
    discountText: 'Special Offer',
    buttonText: 'Shop Now',
    imageUrl: products.find((p) => p.imageUrl)?.imageUrl || null,
    link: '#products'
  };

  const displayOffers = offers.length > 0 ? offers : [fallbackOffer];

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setQuantity(1);
    const firstWeight = weightOptions(product)[2];
    setSelectedWeight(firstWeight.weight);
    setSelectedWeightPrice(firstWeight.price);
  }

  function handleAddFromModal() {
    if (!selectedProduct) return;

    if (selectedProduct.saleType === 'WEIGHT') {
      addToCart(selectedProduct, quantity, selectedWeight, selectedWeightPrice);
    } else {
      addToCart(selectedProduct, quantity, undefined, selectedProduct.piecePrice || selectedProduct.price);
    }

    window.dispatchEvent(new Event('cart-updated'));
    setCartVersion((v) => v + 1);
    setSelectedProduct(null);
  }

  const modalUnitPrice = selectedProduct?.saleType === 'WEIGHT'
    ? selectedWeightPrice
    : selectedProduct
      ? selectedProduct.piecePrice || selectedProduct.price
      : 0;

  return (
    <div className="app-shell">
      <section className="-mx-4 rounded-b-[38px] bg-[#9b6128] px-4 pb-8 pt-4 text-white md:mx-0 md:rounded-[38px] md:p-8 float-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/70">Location</p>
            <p className="mt-1 text-sm font-black">Nextgen mall, South C, Nairobi, Kenya</p>
          </div>
          <a href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="tap-animate rounded-2xl bg-white/15 px-4 py-2 text-xs font-black">WhatsApp</a>
        </div>

        <div className="mt-5 rounded-2xl bg-white p-2">
          <div className="flex items-center gap-3 rounded-xl bg-[#fbf4e8] px-4 py-3">
            <span className="h-4 w-4 rounded-full border-2 border-[#9b6128]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sweets, cookies, cakes..."
              className="w-full bg-transparent text-sm font-bold text-[#221b18] outline-none placeholder:text-[#7e7169]/60"
            />
          </div>
        </div>
      </section>

      <section id="offers" className="mt-6 float-in">
        <div className="section-head">
          <h2 className="section-title">Special Offers</h2>
          <a href="#products" className="tap-animate text-sm font-black text-[#9b6128]">See All</a>
        </div>

        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [-webkit-overflow-scrolling:touch]">
          {displayOffers.map((offer) => (
            <a key={offer.id} href={offer.link || '#products'} className="card-pop relative h-[178px] w-[330px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-[#ddd1c4] shadow-[0_14px_36px_rgba(34,27,24,0.10)] md:w-[500px]">
              <div className="absolute inset-y-0 right-0 w-[48%] bg-[#e9ddd2]">
                {offer.imageUrl && <img src={offer.imageUrl} alt={offer.title} className="h-full w-full object-contain p-2" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#e9ddd2] via-[#e9ddd2] to-[#e9ddd2]/20" />
              <div className="relative z-10 flex h-full max-w-[62%] flex-col justify-center p-5">
                {offer.label && <span className="mb-3 w-fit rounded-full bg-white px-3 py-1 text-xs font-black text-[#221b18]">{offer.label}</span>}
                <h3 className="text-2xl font-black leading-tight text-[#221b18]">{offer.title}</h3>
                {offer.discountText && <p className="mt-2 text-3xl font-black text-[#221b18]">{offer.discountText}</p>}
                {offer.subtitle && <p className="mt-2 line-clamp-2 text-sm font-bold text-[#7e7169]">{offer.subtitle}</p>}
                <span className="mt-3 w-fit rounded-xl bg-white px-4 py-2 text-sm font-black text-[#221b18]">{offer.buttonText}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="categories" className="mt-6 float-in">
        <div className="section-head">
          <h2 className="section-title">Categories</h2>
          <button type="button" onClick={() => setActiveCategory('All')} className="tap-animate text-sm font-black text-[#9b6128]">See All</button>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 [-webkit-overflow-scrolling:touch]">
          <button type="button" onClick={() => setActiveCategory('All')} className="tap-animate w-[78px] shrink-0 text-center">
            <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${activeCategory === 'All' ? 'bg-[#9b6128] text-white' : 'bg-white text-[#9b6128]'}`}>
              All
            </span>
            <span className="mt-2 block text-xs font-black">All</span>
          </button>
          {categories.map((category) => (
            <button key={category.id} type="button" onClick={() => setActiveCategory(category.name)} className="tap-animate w-[78px] shrink-0 text-center">
              <span className={`mx-auto grid h-16 w-16 overflow-hidden rounded-full ${activeCategory === category.name ? 'bg-[#9b6128]' : 'bg-white'}`}>
                {category.iconUrl ? <img src={category.iconUrl} alt={category.name} className="h-full w-full object-cover" /> : <Image src="/logo.png" alt={category.name} width={44} height={44} className="m-auto h-10 w-10 object-contain" />}
              </span>
              <span className="mt-2 block line-clamp-1 text-xs font-black">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="products" className="mt-6 float-in">
        <div className="section-head">
          <h2 className="section-title">{activeCategory === 'All' ? 'Featured Products' : activeCategory}</h2>
          <span className="text-sm font-black text-[#7e7169]">{filteredProducts.length} items</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="app-panel p-8 text-center">
            <h3 className="text-xl font-black">No products found</h3>
            <p className="mt-2 text-sm text-[#7e7169]">Add products from admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={`${product.id}-${cartVersion}`} product={product} onOpen={openProduct} cartVersion={cartVersion} />
            ))}
          </div>
        )}
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-[130]">
          <button type="button" className="absolute inset-0 bg-black/45" onClick={() => setSelectedProduct(null)} />
          <div className="slide-up absolute bottom-0 left-0 right-0 max-h-[92vh] overflow-auto rounded-t-[34px] bg-white md:left-1/2 md:right-auto md:w-[520px] md:-translate-x-1/2 md:rounded-[34px]">
            <div className="aspect-[4/3] bg-[#fbf4e8]">
              <ProductImage src={selectedProduct.imageUrl} name={selectedProduct.name} />
            </div>
            <div className="p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#9b6128]">{selectedProduct.category?.name || 'Product'}</p>
                  <h2 className="mt-2 text-3xl font-black">{selectedProduct.name}</h2>
                </div>
                <button type="button" onClick={() => setSelectedProduct(null)} className="tap-animate h-fit rounded-full border px-4 py-2 text-sm font-black">Close</button>
              </div>
              {selectedProduct.description && <p className="mt-4 leading-7 text-[#7e7169]">{selectedProduct.description}</p>}
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fbf4e8] p-4">
                <span className="font-bold text-[#7e7169]">Rating</span>
                <Stars rating={selectedProduct.rating} />
              </div>

              {selectedProduct.saleType === 'WEIGHT' ? (
                <div className="mt-5">
                  <h3 className="font-black">Select Weight</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {weightOptions(selectedProduct).map((item) => (
                      <button key={item.weight} type="button" onClick={() => { setSelectedWeight(item.weight); setSelectedWeightPrice(item.price); }} className={`tap-animate rounded-xl px-3 py-3 text-sm font-black ${selectedWeight === item.weight ? 'bg-[#9b6128] text-white' : 'bg-[#fbf4e8] text-[#221b18]'}`}>
                        <span className="block">{item.label}</span>
                        <span className="block text-xs opacity-80">{money(item.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fbf4e8] p-4">
                  <span className="font-bold text-[#7e7169]">Piece price</span>
                  <span className="text-2xl font-black text-[#9b6128]">{money(selectedProduct.piecePrice || selectedProduct.price)}</span>
                </div>
              )}

              <div className="mt-5 flex items-center justify-between">
                <span className="font-black">Quantity</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="tap-animate h-11 w-11 rounded-2xl border text-xl font-black">-</button>
                  <span className="min-w-8 text-center text-lg font-black">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="tap-animate h-11 w-11 rounded-2xl border text-xl font-black">+</button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#fbf4e8] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#7e7169]">Total</span>
                  <span className="text-2xl font-black text-[#9b6128]">{money(modalUnitPrice * quantity)}</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <button type="button" onClick={handleAddFromModal} className="tap-animate rounded-2xl bg-[#9b6128] px-5 py-4 text-sm font-black text-white">
                  Add to Cart
                </button>
                <a href={productWhatsappLink(selectedProduct)} target="_blank" className="tap-animate rounded-2xl border px-5 py-4 text-center text-sm font-black">
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
