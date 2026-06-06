import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from './actions';

export default async function CategoriesPage({ searchParams }: { searchParams: { error?: string; success?: string } }) {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' }, include: { _count: { select: { products: true } } } });

  return (
    <div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Homepage categories</p>
        <h1 className="mt-2 text-4xl font-black">Categories</h1>
        <p className="mt-3 text-[#7e7169]">Add categories and choose an icon/image for each category shown on the homepage.</p>
      </div>

      {searchParams.error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">Could not save category.</div>}
      {searchParams.success && <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-black text-green-700">Saved successfully.</div>}

      <form action={createCategory} className="admin-card mt-8 grid gap-4 p-6" encType="multipart/form-data">
        <div className="grid gap-4 md:grid-cols-[1fr_160px]">
          <div><label className="label">Category name</label><input name="name" required className="input mt-2" /></div>
          <div><label className="label">Sort order</label><input name="sortOrder" type="number" className="input mt-2" /></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Icon URL</label><input name="iconUrl" className="input mt-2" placeholder="Optional if you upload icon" /></div>
          <div><label className="label">Upload category icon</label><input name="iconFile" type="file" accept="image/*" className="input mt-2" /></div>
        </div>
        <button className="admin-action w-fit">Add category</button>
      </form>

      <div className="admin-card mt-8 overflow-hidden">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between border-b border-[#eadfcc] p-5 last:border-0">
            <div className="flex items-center gap-4">
              {category.iconUrl ? <img src={category.iconUrl} alt={category.name} className="h-14 w-14 rounded-full object-cover" /> : <div className="grid h-14 w-14 place-items-center rounded-full bg-[#fbf4e8] text-xs font-black">Icon</div>}
              <div><b>{category.name}</b><p className="mt-1 text-sm text-[#7e7169]">{category._count.products} products • Sort {category.sortOrder}</p></div>
            </div>
            <form action={deleteCategory}><input type="hidden" name="id" value={category.id} /><button className="text-sm font-black text-red-600 underline">Delete</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
