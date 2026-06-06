import Link from 'next/link';
import { logoutAction } from './login/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-black/5 bg-white p-5 md:block">
        <h2 className="text-2xl font-black text-plum">lolo's admin</h2>

        <nav className="mt-8 grid gap-2 font-semibold">
          <Link className="rounded-2xl px-4 py-3 hover:bg-cream" href="/admin">
            Dashboard
          </Link>
          <Link className="rounded-2xl px-4 py-3 hover:bg-cream" href="/admin/orders">
            Orders
          </Link>
          <Link className="rounded-2xl px-4 py-3 hover:bg-cream" href="/admin/products">
            Products
          </Link>
          <Link className="rounded-2xl px-4 py-3 hover:bg-cream" href="/admin/categories">
            Categories
          </Link>
          <Link className="rounded-2xl px-4 py-3 hover:bg-cream" href="/">
            View store
          </Link>
        </nav>

        <form action={logoutAction} className="absolute bottom-5 left-5 right-5">
          <button className="btn-soft w-full">Logout</button>
        </form>
      </aside>

      <main className="md:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}