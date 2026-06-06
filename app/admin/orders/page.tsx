import { prisma } from '@/lib/prisma';
import { money } from '@/lib/money';
import { updateOrder } from './actions';

export default async function OrdersAdminPage() {
  const orders = await prisma.order.findMany({ include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });
  return (
    <div>
      <h1 className="text-4xl font-black">Orders</h1>
      <div className="mt-8 space-y-5">
        {orders.map((order) => (
          <article key={order.id} className="card p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-2xl font-black text-plum">Order #{order.orderNumber}</h2>
                <p className="text-sm text-ink/50">{order.createdAt.toLocaleString('en-KE')}</p>
                <p className="mt-3 font-bold">{order.customerName} • {order.customerPhone}</p>
                <p className="text-sm text-ink/60">{order.deliveryType} • {order.paymentMethod}</p>
                {order.customerAddress && <p className="text-sm text-ink/60">Address: {order.customerAddress}</p>}
                {order.notes && <p className="mt-2 rounded-2xl bg-cream p-3 text-sm">Notes: {order.notes}</p>}
              </div>
              <div className="text-left md:text-right"><p className="text-sm text-ink/50">Total</p><h3 className="text-3xl font-black">{money(order.total)}</h3></div>
            </div>
            <div className="mt-5 rounded-2xl bg-cream p-4">
              {order.items.map((item) => <div key={item.id} className="flex justify-between border-b py-2 last:border-0"><span>{item.product.name} × {item.quantity}</span><b>{money(item.total)}</b></div>)}
            </div>
            <form action={updateOrder} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_160px]">
              <input type="hidden" name="id" value={order.id} />
              <select name="status" defaultValue={order.status} className="input"><option>NEW</option><option>PREPARING</option><option>READY</option><option>DELIVERED</option><option>CANCELLED</option></select>
              <select name="paymentStatus" defaultValue={order.paymentStatus} className="input"><option>UNPAID</option><option>PAID</option></select>
              <button className="btn-primary">Update</button>
            </form>
          </article>
        ))}
        {orders.length === 0 && <div className="card p-8 text-center text-ink/60">No orders yet.</div>}
      </div>
    </div>
  );
}
