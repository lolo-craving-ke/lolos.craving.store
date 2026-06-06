'use server';
import { redirect } from 'next/navigation';
import { setAdminSession, clearAdminSession } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    setAdminSession(email);
    redirect('/admin');
  }
  redirect('/admin/login?error=1');
}

export async function logoutAction() {
  clearAdminSession();
  redirect('/admin/login');
}
