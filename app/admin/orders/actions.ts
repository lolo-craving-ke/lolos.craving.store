'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { OrderStatus, PaymentStatus } from '@prisma/client';

export async function updateOrder(formData: FormData) {
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || 'NEW') as OrderStatus;
  const paymentStatus = String(formData.get('paymentStatus') || 'UNPAID') as PaymentStatus;
  await prisma.order.update({ where: { id }, data: { status, paymentStatus } });
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
}
