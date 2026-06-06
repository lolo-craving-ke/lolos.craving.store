import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from './actions';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' }, include: { _count: { select: { products: true } } } });
  return (
    <div>
      <h1 className="text-4xl font-black">Categories</h1>
      <form action={createCategory} className="card mt-8 grid gap-4 p-6 md:grid-cols-[1fr_160px_160px]">
        <input name="name" required className="input" placeholder="Category name" />
        <input name="sortOrder" type="number" className="input" placeholder="Sort" />
        <button className="btn-primary">Add category</button>
      </form>
      <div className="card mt-8 overflow-hidden">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between border-b p-4 last:border-0">
            <div><b>{category.name}</b><p className="text-sm text-ink/50">{category._count.products} products</p></div>
            <form action={deleteCategory}><input type="hidden" name="id" value={category.id} /><button className="font-bold text-red-600">Delete</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
