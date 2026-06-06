'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

async function imageFromForm(formData: FormData) {
  const imageUrl = String(formData.get('imageUrl') || '').trim();
  const file = formData.get('imageFile');
  if (file && typeof file !== 'string' && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    return `data:${file.type};base64,${base64}`;
  }
  return imageUrl || null;
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const price = Number(formData.get('price') || 0);
  const categoryId = String(formData.get('categoryId') || '') || null;
  const imageUrl = await imageFromForm(formData);
  if (!name || price <= 0) return;
  await prisma.product.create({ data: { name, description, price, categoryId, imageUrl, available: formData.get('available') === 'on' } });
  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath('/');
}

export async function updateAvailability(formData: FormData) {
  const id = String(formData.get('id') || '');
  const available = formData.get('available') === 'true';
  await prisma.product.update({ where: { id }, data: { available } });
  revalidatePath('/admin/products');
  revalidatePath('/products');
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get('id') || '');
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/products');
}
