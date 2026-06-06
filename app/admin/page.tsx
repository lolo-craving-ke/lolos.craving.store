import { prisma } from '@/lib/prisma';
import { money } from '@/lib/money';

export default async function AdminPage() {
  const [products, orders, newOrders, paidOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'NEW' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'PAID' } })
  ]);

  const cards = [
    ['Products', products, 'Items currently managed in the store'],
    ['Total orders', orders, 'All customer orders received'],
    ['New orders', newOrders, 'Orders waiting for action'],
    ['Paid sales', money(paidOrders._sum.total || 0), 'Total paid order value']
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Overview</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <a href="/" className="admin-muted w-fit">Open store</a>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {cards.map(([label, value, description]) => (
          <div key={label} className="admin-card p-6">
            <p className="text-sm font-semibold text-[#746b78]">{label}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#3a243f]">{value}</h2>
            <p className="mt-3 text-sm leading-6 text-[#746b78]">{description}</p>
          </div>
        ))}
      </div>

      <div className="admin-card mt-8 p-6">
        <h2 className="text-xl font-semibold">Store management</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#746b78]">
          Use the dashboard to add products, organize categories, review orders and keep the public store updated.
        </p>
      </div>
    </div>
  );
}
