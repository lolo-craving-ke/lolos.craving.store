import Image from 'next/image';
import { loginAction } from './actions';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form action={loginAction} className="card w-full max-w-md p-8">
        <div className="text-center">
          <Image src="/logo.jpg" alt="Logo" width={96} height={96} className="mx-auto rounded-3xl" />
          <h1 className="mt-4 text-3xl font-black text-plum">Admin login</h1>
          <p className="mt-2 text-sm text-ink/60">Manage products, categories and orders.</p>
        </div>
        {searchParams.error && <p className="mt-5 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-600">Wrong email or password.</p>}
        <div className="mt-6 grid gap-4">
          <div><label className="label">Email</label><input name="email" type="email" required className="input" /></div>
          <div><label className="label">Password</label><input name="password" type="password" required className="input" /></div>
          <button className="btn-primary">Login</button>
        </div>
      </form>
    </main>
  );
}
