'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

async function imageFromForm(formData: FormData) {
  const imageUrl = String(formData.get('imageUrl') || '').trim();
  const file = formData.get('imageFile');

  if (file && typeof file !== 'string' && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE) {
      redirect('/admin/products?error=image-too-large');
    }

    if (!file.type.startsWith('image/')) {
      redirect('/admin/products?error=invalid-image');
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    return `data:${file.type};base64,${base64}`;
  }

  return imageUrl || null;
}

export async function createProduct(formData: FormData) {
  try {
    const name = String(formData.get('name') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const price = Number(formData.get('price') || 0);
    const categoryIdValue = String(formData.get('categoryId') || '').trim();
    const categoryId = categoryIdValue || null;
    const imageUrl = await imageFromForm(formData);

    if (!name) {
      redirect('/admin/products?error=missing-name');
    }

    if (!Number.isFinite(price) || price <= 0) {
      redirect('/admin/products?error=invalid-price');
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price: Math.round(price),
        categoryId,
        imageUrl,
        available: formData.get('available') === 'on'
      }
    });

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('CREATE_PRODUCT_ERROR', error);
    redirect('/admin/products?error=create-failed');
  }

  redirect('/admin/products?success=product-added');
}

export async function updateAvailability(formData: FormData) {
  const id = String(formData.get('id') || '');
  const available = formData.get('available') === 'true';

  if (!id) {
    redirect('/admin/products?error=missing-product');
  }

  try {
    await prisma.product.update({ where: { id }, data: { available } });
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('UPDATE_PRODUCT_AVAILABILITY_ERROR', error);
    redirect('/admin/products?error=update-failed');
  }

  redirect('/admin/products?success=product-updated');
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get('id') || '');

  if (!id) {
    redirect('/admin/products?error=missing-product');
  }

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('DELETE_PRODUCT_ERROR', error);
    redirect('/admin/products?error=delete-failed');
  }

  redirect('/admin/products?success=product-deleted');
}
