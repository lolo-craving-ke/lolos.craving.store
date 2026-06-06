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
    ['Products', products],
    ['Total orders', orders],
    ['New orders', newOrders],
    ['Paid sales', money(paidOrders._sum.total || 0)]
  ];
  return (
    <div>
      <h1 className="text-4xl font-black">Dashboard</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="card p-6"><p className="text-sm font-bold text-ink/50">{label}</p><h2 className="mt-2 text-3xl font-black text-plum">{value}</h2></div>)}</div>
    </div>
  );
}
