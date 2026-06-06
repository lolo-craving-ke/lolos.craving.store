import { prisma } from '@/lib/prisma';
import { money } from '@/lib/money';
import { createProduct, deleteProduct, updateAvailability } from './actions';

export default async function ProductsAdminPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
  ]);

  return (
    <div>
      <div>
        <p className="section-kicker">Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Products</h1>
        <p className="mt-3 text-[#746b78]">Add, hide or remove products shown on the public store.</p>
      </div>

      <form action={createProduct} className="admin-card mt-8 grid gap-5 p-6" encType="multipart/form-data">
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Product name</label><input name="name" required className="input mt-2" /></div>
          <div><label className="label">Price KSH</label><input name="price" type="number" required className="input mt-2" /></div>
        </div>
        <div><label className="label">Description</label><textarea name="description" className="input mt-2" rows={3} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Category</label><select name="categoryId" className="input mt-2"><option value="">No category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="label">Image URL</label><input name="imageUrl" className="input mt-2" placeholder="Optional if you upload a file" /></div>
        </div>
        <div><label className="label">Upload image</label><input name="imageFile" type="file" accept="image/*" className="input mt-2" /></div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#3a243f]"><input type="checkbox" name="available" defaultChecked /> Available on store</label>
        <button className="admin-action w-fit">Add product</button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="admin-card flex gap-4 p-4">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-28 w-28 rounded-xl object-cover" /> : <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-[#f3eee8] text-xs font-semibold text-[#746b78]">No image</div>}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-[#746b78]">{product.category?.name || 'No category'}</p>
                </div>
                <span className="rounded-full bg-[#f3eee8] px-3 py-1 text-xs font-semibold text-[#3a243f]">{product.available ? 'Visible' : 'Hidden'}</span>
              </div>
              <p className="mt-3 font-semibold text-[#3a243f]">{money(product.price)}</p>
              <div className="mt-4 flex gap-3">
                <form action={updateAvailability}><input type="hidden" name="id" value={product.id} /><input type="hidden" name="available" value={String(!product.available)} /><button className="text-sm font-semibold text-[#3a243f] underline">{product.available ? 'Hide' : 'Show'}</button></form>
                <form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><button className="text-sm font-semibold text-red-600 underline">Delete</button></form>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <div className="admin-card p-8 text-center text-[#746b78] md:col-span-2">No products yet.</div>}
      </div>
    </div>
  );
}
