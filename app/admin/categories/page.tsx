import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from './actions';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' }, include: { _count: { select: { products: true } } } });

  return (
    <div>
      <div>
        <p className="section-kicker">Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-3 text-[#746b78]">Organize products into menu sections.</p>
      </div>

      <form action={createCategory} className="admin-card mt-8 grid gap-4 p-6 md:grid-cols-[1fr_160px_160px]">
        <input name="name" required className="input" placeholder="Category name" />
        <input name="sortOrder" type="number" className="input" placeholder="Sort" />
        <button className="admin-action">Add category</button>
      </form>

      <div className="admin-card mt-8 overflow-hidden">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between border-b border-[#e8e1ea] p-5 last:border-0">
            <div><b>{category.name}</b><p className="mt-1 text-sm text-[#746b78]">{category._count.products} products</p></div>
            <form action={deleteCategory}><input type="hidden" name="id" value={category.id} /><button className="text-sm font-semibold text-red-600 underline">Delete</button></form>
          </div>
        ))}
        {categories.length === 0 && <div className="p-8 text-center text-[#746b78]">No categories yet.</div>}
      </div>
    </div>
  );
}
