import { prisma } from '@/lib/prisma';
import { money } from '@/lib/money';
import { createProduct, deleteProduct, updateAvailability } from './actions';

export default async function ProductsAdminPage({ searchParams }: { searchParams: { error?: string; success?: string } }) {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
  ]);

  return (
    <div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Catalog</p>
        <h1 className="mt-2 text-4xl font-black">Products</h1>
        <p className="mt-3 text-[#7e7169]">Choose product image, rating, badge and whether it is sold by quantity or weight.</p>
      </div>

      {searchParams.error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">Could not save product. Check image size and required fields.</div>}
      {searchParams.success && <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-black text-green-700">Saved successfully.</div>}

      <form action={createProduct} className="admin-card mt-8 grid gap-5 p-6" encType="multipart/form-data">
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Product name</label><input name="name" required className="input mt-2" /></div>
          <div><label className="label">Price KSH</label><input name="price" type="number" required className="input mt-2" /></div>
        </div>

        <div><label className="label">Description</label><textarea name="description" className="input mt-2" rows={3} /></div>

        <div className="grid gap-4 md:grid-cols-3">
          <div><label className="label">Category</label><select name="categoryId" className="input mt-2"><option value="">No category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="label">Sold by</label><select name="saleType" className="input mt-2"><option value="QUANTITY">Quantity / Piece / Box</option><option value="WEIGHT">Weight / Kg</option></select></div>
          <div><label className="label">Rating</label><input name="rating" type="number" step="0.1" min="0" max="5" defaultValue="4.8" className="input mt-2" /></div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Badge</label><input name="badge" className="input mt-2" placeholder="Best Seller / New / Offer" /></div>
          <div><label className="label">Image URL</label><input name="imageUrl" className="input mt-2" placeholder="Optional if you upload a file" /></div>
        </div>

        <div><label className="label">Upload product image</label><input name="imageFile" type="file" accept="image/*" className="input mt-2" /><p className="mt-2 text-xs text-[#7e7169]">Recommended: image smaller than 3MB.</p></div>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm font-black"><input type="checkbox" name="available" defaultChecked /> Available</label>
          <label className="flex items-center gap-2 text-sm font-black"><input type="checkbox" name="featured" /> Featured / Popular</label>
        </div>

        <button className="admin-action w-fit">Add product</button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="admin-card flex gap-4 p-4">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-28 w-28 rounded-xl object-cover" /> : <div className="grid h-28 w-28 place-items-center rounded-xl bg-[#fbf4e8] text-xs font-bold text-[#7e7169]">No image</div>}
            <div className="flex-1">
              <h3 className="text-lg font-black">{product.name}</h3>
              <p className="text-sm text-[#7e7169]">{product.category?.name || 'No category'} • {product.saleType === 'WEIGHT' ? 'Weight' : 'Quantity'} • Rating {product.rating}</p>
              <p className="mt-2 font-black text-[#9b6128]">{money(product.price)}{product.saleType === 'WEIGHT' ? ' / Kg' : ''}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
                {product.badge && <span className="rounded-full bg-[#f5a623] px-3 py-1 text-white">{product.badge}</span>}
                {product.featured && <span className="rounded-full bg-[#fbf4e8] px-3 py-1">Featured</span>}
                <span className="rounded-full bg-[#fbf4e8] px-3 py-1">{product.available ? 'Visible' : 'Hidden'}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <form action={updateAvailability}><input type="hidden" name="id" value={product.id} /><input type="hidden" name="available" value={String(!product.available)} /><button className="text-sm font-black text-[#9b6128] underline">{product.available ? 'Hide' : 'Show'}</button></form>
                <form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><button className="text-sm font-black text-red-600 underline">Delete</button></form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
