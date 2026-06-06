'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function updateProductSort(formData: FormData) {
  const ids = formData.getAll('id').map(String);

  try {
    await Promise.all(
      ids.map((id) => {
        const sortOrder = Number(formData.get(`sortOrder-${id}`) || 0);
        return prisma.product.update({
          where: { id },
          data: { sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0 }
        });
      })
    );

    revalidatePath('/admin/sort-products');
    revalidatePath('/');
  } catch (error) {
    console.error('UPDATE_PRODUCT_SORT_ERROR', error);
    redirect('/admin/sort-products?error=update-failed');
  }

  redirect('/admin/sort-products?success=updated');
}
