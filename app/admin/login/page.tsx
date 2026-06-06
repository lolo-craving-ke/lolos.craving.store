import Image from 'next/image';
import { loginAction } from './actions';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#faf7f2] px-4">
      <form action={loginAction} className="w-full max-w-md rounded-2xl border border-[#e8e1ea] bg-white p-8 shadow-[0_16px_45px_rgba(42,35,45,0.07)]">
        <div className="text-center">
          <Image src="/logo.png" alt="lolo's craving" width={112} height={70} className="mx-auto h-16 w-auto object-contain" />
          <h1 className="mt-6 text-3xl font-semibold text-[#2a232d]">Admin login</h1>
          <p className="mt-2 text-sm text-[#746b78]">Manage products, categories and orders.</p>
        </div>
        {searchParams.error && <p className="mt-5 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-600">Wrong email or password.</p>}
        <div className="mt-6 grid gap-4">
          <div><label className="label">Email</label><input name="email" type="email" required className="input mt-2" /></div>
          <div><label className="label">Password</label><input name="password" type="password" required className="input mt-2" /></div>
          <button className="admin-action">Login</button>
        </div>
      </form>
    </main>
  );
}
