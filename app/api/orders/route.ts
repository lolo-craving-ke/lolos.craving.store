import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(6),
  customerAddress: z.string().optional(),
  deliveryType: z.enum(['DELIVERY', 'PICKUP']),
  paymentMethod: z.string().min(2),
  notes: z.string().optional(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1) })).min(1)
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const products = await prisma.product.findMany({ where: { id: { in: body.items.map((item) => item.productId) }, available: true } });
    if (products.length !== body.items.length) return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
    const total = body.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);
    const order = await prisma.order.create({
      data: {
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerAddress: body.customerAddress,
        deliveryType: body.deliveryType,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
        total,
        items: {
          create: body.items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return { productId: item.productId, quantity: item.quantity, unitPrice: product.price, total: product.price * item.quantity };
          })
        }
      }
    });
    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
