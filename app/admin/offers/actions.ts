'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

async function imageFromForm(formData: FormData) {
  const imageUrl = String(formData.get('imageUrl') || '').trim();
  const file = formData.get('imageFile');

  if (file && typeof file !== 'string' && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE || !file.type.startsWith('image/')) {
      redirect('/admin/offers?error=invalid-image');
    }
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    return `data:${file.type};base64,${base64}`;
  }

  return imageUrl || null;
}

export async function createOffer(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const subtitle = String(formData.get('subtitle') || '').trim() || null;
  const label = String(formData.get('label') || '').trim() || null;
  const discountText = String(formData.get('discountText') || '').trim() || null;
  const buttonText = String(formData.get('buttonText') || 'Shop Now').trim() || 'Shop Now';
  const link = String(formData.get('link') || '/#products').trim() || '/#products';
  const sortOrder = Number(formData.get('sortOrder') || 0);
  const imageUrl = await imageFromForm(formData);

  if (!title) redirect('/admin/offers?error=missing-title');

  try {
    await prisma.offer.create({
      data: {
        title,
        subtitle,
        label,
        discountText,
        buttonText,
        link,
        imageUrl,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
        active: formData.get('active') === 'on'
      }
    });
    revalidatePath('/admin/offers');
    revalidatePath('/');
  } catch (error) {
    console.error('CREATE_OFFER_ERROR', error);
    redirect('/admin/offers?error=create-failed');
  }

  redirect('/admin/offers?success=created');
}

export async function toggleOffer(formData: FormData) {
  const id = String(formData.get('id') || '');
  const active = formData.get('active') === 'true';

  await prisma.offer.update({ where: { id }, data: { active } });
  revalidatePath('/admin/offers');
  revalidatePath('/');
  redirect('/admin/offers?success=updated');
}

export async function deleteOffer(formData: FormData) {
  const id = String(formData.get('id') || '');
  await prisma.offer.delete({ where: { id } });
  revalidatePath('/admin/offers');
  revalidatePath('/');
  redirect('/admin/offers?success=deleted');
}
