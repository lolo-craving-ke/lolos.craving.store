'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

async function imageFromForm(formData: FormData) {
  const imageUrl = String(formData.get('iconUrl') || '').trim();
  const file = formData.get('iconFile');

  if (file && typeof file !== 'string' && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE || !file.type.startsWith('image/')) {
      redirect('/admin/categories?error=invalid-icon');
    }
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    return `data:${file.type};base64,${base64}`;
  }

  return imageUrl || null;
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const sortOrder = Number(formData.get('sortOrder') || 0);
  const iconUrl = await imageFromForm(formData);

  if (!name) redirect('/admin/categories?error=missing-name');

  try {
    await prisma.category.create({ data: { name, sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0, iconUrl } });
    revalidatePath('/admin/categories');
    revalidatePath('/');
  } catch (error) {
    console.error('CREATE_CATEGORY_ERROR', error);
    redirect('/admin/categories?error=create-failed');
  }

  redirect('/admin/categories?success=created');
}

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get('id') || '');
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
    revalidatePath('/');
  } catch (error) {
    console.error('DELETE_CATEGORY_ERROR', error);
    redirect('/admin/categories?error=delete-failed');
  }

  redirect('/admin/categories?success=deleted');
}
