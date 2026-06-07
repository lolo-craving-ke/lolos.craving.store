'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

export async function deleteOrder(formData: FormData) {
  const id = String(formData.get('id') || '');

  if (!id) {
    redirect('/admin/orders?error=missing-order');
  }

  try {
    await prisma.order.delete({ where: { id } });

    revalidatePath('/admin/orders');
    revalidatePath('/admin');
  } catch (error) {
    console.error('DELETE_ORDER_ERROR', error);
    redirect('/admin/orders?error=delete-failed');
  }

  redirect('/admin/orders?success=deleted');
}
