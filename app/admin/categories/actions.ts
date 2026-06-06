'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function createCategory(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const sortOrder = Number(formData.get('sortOrder') || 0);
  if (!name) return;
  await prisma.category.create({ data: { name, sortOrder } });
  revalidatePath('/admin/categories');
}

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
}
