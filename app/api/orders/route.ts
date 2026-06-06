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
  items: z.array(z.object({
    productId: z.string().min(1),
    name: z.string().optional(),
    quantity: z.number().int().min(1),
    unitPrice: z.number().int().min(1).optional()
  })).min(1)
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const productIds = body.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, available: true }
    });

    const validItems = body.items.filter((item) => products.some((product) => product.id === item.productId));
    if (validItems.length === 0) {
      return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
    }

    const total = validItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const unitPrice = item.unitPrice || product.price;
      return sum + unitPrice * item.quantity;
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
          create: validItems.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            const unitPrice = item.unitPrice || product.price;
            return {
              productId: item.productId,
              quantity: item.quantity,
              unitPrice,
              total: unitPrice * item.quantity
            };
          })
        }
      }
    });

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  } catch (error) {
    console.error('CREATE_ORDER_ERROR', error);
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
