import { prisma } from '@/lib/prisma';
import { updateProductSort } from './actions';

export default async function SortProductsPage({ searchParams }: { searchParams: { success?: string; error?: string } }) {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }]
  });

  return (
    <div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Homepage order</p>
        <h1 className="mt-2 text-4xl font-black">Sort Products</h1>
        <p className="mt-3 text-[#7e7169]">Lower numbers appear first on the homepage.</p>
      </div>

      {searchParams.success && <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-black text-green-700">Order updated successfully.</div>}
      {searchParams.error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">Could not update order.</div>}

      <form action={updateProductSort} className="admin-card mt-8 overflow-hidden">
        {products.map((product) => (
          <div key={product.id} className="grid gap-4 border-b border-[#eadfcc] p-5 md:grid-cols-[80px_1fr_140px] md:items-center">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-20 w-20 rounded-xl object-cover" /> : <div className="h-20 w-20 rounded-xl bg-[#fbf4e8]" />}
            <div>
              <h3 className="font-black">{product.name}</h3>
              <p className="mt-1 text-sm text-[#7e7169]">{product.category?.name || 'No category'}</p>
            </div>
            <div>
              <input type="hidden" name="id" value={product.id} />
              <label className="label">Sort</label>
              <input name={`sortOrder-${product.id}`} type="number" defaultValue={product.sortOrder} className="input mt-2" />
            </div>
          </div>
        ))}

        <div className="p-5">
          <button className="admin-action">Save order</button>
        </div>
      </form>
    </div>
  );
}
