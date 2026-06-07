'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma, SaleType } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

async function imageFromForm(formData: FormData, fieldName: string, urlFieldName: string, currentImage?: string | null) {
  const imageUrl = String(formData.get(urlFieldName) || '').trim();
  const file = formData.get(fieldName);

  if (file && typeof file !== 'string' && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE || !file.type.startsWith('image/')) {
      redirect('/admin/products?error=invalid-image');
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    return `data:${file.type};base64,${base64}`;
  }

  return imageUrl || currentImage || null;
}

function numberOrNull(value: FormDataEntryValue | null) {
  const n = Number(value || 0);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function productData(formData: FormData, imageUrl: string | null): Prisma.ProductUncheckedCreateInput {
  const saleType: SaleType = String(formData.get('saleType') || 'QUANTITY') === 'WEIGHT'
    ? SaleType.WEIGHT
    : SaleType.QUANTITY;

  const piecePrice = numberOrNull(formData.get('piecePrice'));
  const price250g = numberOrNull(formData.get('price250g'));
  const price500g = numberOrNull(formData.get('price500g'));
  const price1kg = numberOrNull(formData.get('price1kg'));
  const rawPrice = numberOrNull(formData.get('price'));

  const price = saleType === SaleType.WEIGHT
    ? price1kg || rawPrice || 1
    : piecePrice || rawPrice || 1;

  return {
    name: String(formData.get('name') || '').trim(),
    description: String(formData.get('description') || '').trim() || null,
    price,
    piecePrice: saleType === SaleType.QUANTITY ? piecePrice || price : null,
    price250g: saleType === SaleType.WEIGHT ? price250g : null,
    price500g: saleType === SaleType.WEIGHT ? price500g : null,
    price1kg: saleType === SaleType.WEIGHT ? price1kg || price : null,
    categoryId: String(formData.get('categoryId') || '').trim() || null,
    imageUrl,
    whatsappUrl: String(formData.get('whatsappUrl') || '').trim() || null,
    saleType,
    rating: Math.min(5, Math.max(0, Number(formData.get('rating') || 4.8))),
    badge: String(formData.get('badge') || '').trim() || null,
    featured: formData.get('featured') === 'on',
    available: formData.get('available') === 'on',
    sortOrder: Number.isFinite(Number(formData.get('sortOrder') || 0)) ? Number(formData.get('sortOrder') || 0) : 0
  };
}

export async function createProduct(formData: FormData) {
  try {
    const imageUrl = await imageFromForm(formData, 'imageFile', 'imageUrl');
    const data = productData(formData, imageUrl);

    if (!data.name) {
      redirect('/admin/products?error=invalid-data');
    }

    await prisma.product.create({ data });

    revalidatePath('/admin/products');
    revalidatePath('/admin/sort-products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('CREATE_PRODUCT_ERROR', error);
    redirect('/admin/products?error=create-failed');
  }

  redirect('/admin/products?success=product-added');
}

export async function updateProduct(formData: FormData) {
  const id = String(formData.get('id') || '');

  try {
    const current = await prisma.product.findUnique({ where: { id } });

    if (!current) {
      redirect('/admin/products?error=missing-product');
    }

    const imageUrl = await imageFromForm(formData, 'imageFile', 'imageUrl', current.imageUrl);
    const data = productData(formData, imageUrl);

    if (!data.name) {
      redirect(`/admin/products/${id}?error=invalid-data`);
    }

    await prisma.product.update({ where: { id }, data });

    revalidatePath('/admin/products');
    revalidatePath('/admin/sort-products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('UPDATE_PRODUCT_ERROR', error);
    redirect(`/admin/products/${id}?error=update-failed`);
  }

  redirect('/admin/products?success=product-updated');
}

export async function updateAvailability(formData: FormData) {
  const id = String(formData.get('id') || '');
  const available = formData.get('available') === 'true';

  try {
    await prisma.product.update({ where: { id }, data: { available } });

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('UPDATE_PRODUCT_ERROR', error);
    redirect('/admin/products?error=update-failed');
  }

  redirect('/admin/products?success=product-updated');
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get('id') || '');

  try {
    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');
    revalidatePath('/admin/sort-products');
    revalidatePath('/products');
    revalidatePath('/');
  } catch (error) {
    console.error('DELETE_PRODUCT_ERROR', error);
    redirect('/admin/products?error=delete-failed');
  }

  redirect('/admin/products?success=product-deleted');
}
