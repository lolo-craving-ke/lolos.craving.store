import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateProduct } from '../actions';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
  ]);

  if (!product) notFound();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Edit product</p>
          <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
        </div>
        <Link href="/admin/products" className="admin-muted">Back</Link>
      </div>

      <form action={updateProduct} className="admin-card mt-8 grid gap-5 p-6" encType="multipart/form-data">
        <input type="hidden" name="id" value={product.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Product name</label><input name="name" required defaultValue={product.name} className="input mt-2" /></div>
          <div><label className="label">Fallback price KSH</label><input name="price" type="number" defaultValue={product.price} className="input mt-2" /></div>
        </div>

        <div><label className="label">Description</label><textarea name="description" className="input mt-2" rows={3} defaultValue={product.description || ''} /></div>

        <div className="grid gap-4 md:grid-cols-4">
          <div><label className="label">Category</label><select name="categoryId" defaultValue={product.categoryId || ''} className="input mt-2"><option value="">No category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="label">Sold by</label><select name="saleType" defaultValue={product.saleType} className="input mt-2"><option value="QUANTITY">Quantity / Piece / Box</option><option value="WEIGHT">Weight / Kg</option></select></div>
          <div><label className="label">Rating</label><input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={product.rating} className="input mt-2" /></div>
          <div><label className="label">Sort order</label><input name="sortOrder" type="number" defaultValue={product.sortOrder} className="input mt-2" /></div>
        </div>

        <div className="rounded-2xl bg-[#fbf4e8] p-4">
          <h3 className="font-black">If sold by quantity</h3>
          <div className="mt-3"><label className="label">Piece / box price</label><input name="piecePrice" type="number" defaultValue={product.piecePrice || ''} className="input mt-2" /></div>
        </div>

        <div className="rounded-2xl bg-[#fbf4e8] p-4">
          <h3 className="font-black">If sold by weight</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div><label className="label">Quarter Kg price</label><input name="price250g" type="number" defaultValue={product.price250g || ''} className="input mt-2" /></div>
            <div><label className="label">Half Kg price</label><input name="price500g" type="number" defaultValue={product.price500g || ''} className="input mt-2" /></div>
            <div><label className="label">1 Kg price</label><input name="price1kg" type="number" defaultValue={product.price1kg || ''} className="input mt-2" /></div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Badge</label><input name="badge" defaultValue={product.badge || ''} className="input mt-2" /></div>
          <div><label className="label">Image URL</label><input name="imageUrl" defaultValue={product.imageUrl || ''} className="input mt-2" /></div>
        </div>

        <div><label className="label">Upload new product image</label><input name="imageFile" type="file" accept="image/*" className="input mt-2" /></div>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm font-black"><input type="checkbox" name="available" defaultChecked={product.available} /> Available</label>
          <label className="flex items-center gap-2 text-sm font-black"><input type="checkbox" name="featured" defaultChecked={product.featured} /> Featured / Popular</label>
        </div>

        <button className="admin-action w-fit">Save changes</button>
      </form>
    </div>
  );
}
