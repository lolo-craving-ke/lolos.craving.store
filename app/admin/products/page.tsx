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
      <h1 className="text-4xl font-black">Products</h1>
      <form action={createProduct} className="card mt-8 grid gap-4 p-6" encType="multipart/form-data">
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Product name</label><input name="name" required className="input" /></div>
          <div><label className="label">Price KSH</label><input name="price" type="number" required className="input" /></div>
        </div>
        <div><label className="label">Description</label><textarea name="description" className="input" rows={3} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Category</label><select name="categoryId" className="input"><option value="">No category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="label">Image URL</label><input name="imageUrl" className="input" placeholder="Optional if you upload a file" /></div>
        </div>
        <div><label className="label">Upload image</label><input name="imageFile" type="file" accept="image/*" className="input" /></div>
        <label className="flex items-center gap-2 font-bold"><input type="checkbox" name="available" defaultChecked /> Available</label>
        <button className="btn-primary w-fit">Add product</button>
      </form>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="card flex gap-4 p-4">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-28 w-28 rounded-2xl object-cover" /> : <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-lavender/20 text-4xl">🍪</div>}
            <div className="flex-1">
              <h3 className="text-xl font-black">{product.name}</h3>
              <p className="text-sm text-ink/50">{product.category?.name || 'No category'}</p>
              <p className="mt-2 font-black text-plum">{money(product.price)}</p>
              <div className="mt-4 flex gap-3">
                <form action={updateAvailability}><input type="hidden" name="id" value={product.id} /><input type="hidden" name="available" value={String(!product.available)} /><button className="font-bold text-plum">{product.available ? 'Hide' : 'Show'}</button></form>
                <form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><button className="font-bold text-red-600">Delete</button></form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
