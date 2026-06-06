import { prisma } from '@/lib/prisma';
import { money } from '@/lib/money';
import { updateOrder } from './actions';

export default async function OrdersAdminPage() {
  const orders = await prisma.order.findMany({ include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div>
        <p className="section-kicker">Sales</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Orders</h1>
        <p className="mt-3 text-[#746b78]">Review customer orders, update status and payment state.</p>
      </div>

      <div className="mt-8 space-y-5">
        {orders.map((order) => (
          <article key={order.id} className="admin-card p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-2xl font-semibold text-[#3a243f]">Order #{order.orderNumber}</h2>
                <p className="mt-1 text-sm text-[#746b78]">{order.createdAt.toLocaleString('en-KE')}</p>
                <p className="mt-4 font-semibold">{order.customerName} • {order.customerPhone}</p>
                <p className="mt-1 text-sm text-[#746b78]">{order.deliveryType} • {order.paymentMethod}</p>
                {order.customerAddress && <p className="text-sm text-[#746b78]">Address: {order.customerAddress}</p>}
                {order.notes && <p className="mt-3 rounded-xl bg-[#faf7f2] p-3 text-sm text-[#746b78]">Notes: {order.notes}</p>}
              </div>
              <div className="text-left md:text-right"><p className="text-sm text-[#746b78]">Total</p><h3 className="text-3xl font-semibold">{money(order.total)}</h3></div>
            </div>

            <div className="mt-5 rounded-xl bg-[#faf7f2] p-4">
              {order.items.map((item) => <div key={item.id} className="flex justify-between border-b border-[#e8e1ea] py-2 text-sm last:border-0"><span>{item.product.name} × {item.quantity}</span><b>{money(item.total)}</b></div>)}
            </div>

            <form action={updateOrder} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_160px]">
              <input type="hidden" name="id" value={order.id} />
              <select name="status" defaultValue={order.status} className="input"><option>NEW</option><option>PREPARING</option><option>READY</option><option>DELIVERED</option><option>CANCELLED</option></select>
              <select name="paymentStatus" defaultValue={order.paymentStatus} className="input"><option>UNPAID</option><option>PAID</option></select>
              <button className="admin-action">Update</button>
            </form>
          </article>
        ))}
        {orders.length === 0 && <div className="admin-card p-8 text-center text-[#746b78]">No orders yet.</div>}
      </div>
    </div>
  );
}
