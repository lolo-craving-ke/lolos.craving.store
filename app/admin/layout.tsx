import Image from 'next/image';
import Link from 'next/link';
import { logoutAction } from './login/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[#eadfcc] bg-white p-6 md:block">
        <Link href="/admin" className="block">
          <Image src="/logo.png" alt="lolo's craving admin" width={110} height={64} className="h-14 w-auto object-contain" />
        </Link>
        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Admin dashboard</p>

        <nav className="mt-8 grid gap-1">
          <Link className="admin-link" href="/admin">Dashboard</Link>
          <Link className="admin-link" href="/admin/offers">Special Offers</Link>
          <Link className="admin-link" href="/admin/orders">Orders</Link>
          <Link className="admin-link" href="/admin/products">Products</Link>
          <Link className="admin-link" href="/admin/categories">Categories</Link>
          <Link className="admin-link" href="/">View store</Link>
        </nav>

        <form action={logoutAction} className="absolute bottom-6 left-6 right-6">
          <button className="admin-muted w-full">Logout</button>
        </form>
      </aside>

      <main className="md:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
