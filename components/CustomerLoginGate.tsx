'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type CustomerData = {
  name: string;
  phone: string;
};

const STORAGE_KEY = 'lolos_customer';

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, '').trim();
}

export function CustomerLoginGate({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && parsed?.phone) {
          setCustomer(parsed);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const phone = normalizePhone(String(form.get('phone') || ''));

    if (name.length < 2) {
      setError('Please enter your name.');
      return;
    }

    if (phone.length < 6) {
      setError('Please enter a valid phone number.');
      return;
    }

    const data = { name, phone };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setCustomer(data);
    setError('');
  }

  if (!loaded) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#fbf4e8] px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#eadfcc] border-t-[#9b6128]" />
      </div>
    );
  }

  if (!customer) {
    return (
      <main className="min-h-screen bg-[#fbf4e8] px-4 py-8">
        <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center">
          <div className="grid w-full overflow-hidden rounded-[34px] bg-white shadow-[0_24px_70px_rgba(34,27,24,0.12)] md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative hidden min-h-[620px] bg-[#9b6128] p-10 text-white md:block">
              <div className="absolute inset-0 opacity-15">
                <div className="absolute left-10 top-16 h-40 w-40 rounded-full bg-white blur-2xl" />
                <div className="absolute bottom-16 right-10 h-52 w-52 rounded-full bg-[#f5a623] blur-3xl" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <Image src="/logo.png" alt="lolo's craving" width={130} height={90} className="h-20 w-auto object-contain" priority />
                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white/70">Official store</p>
                  <h1 className="mt-3 max-w-md text-5xl font-black leading-tight">
                    Fresh sweets made for your cravings.
                  </h1>
                  <p className="mt-5 max-w-md text-lg leading-8 text-white/78">
                    Register once, then browse offers, categories and products directly.
                  </p>
                </div>

                <div className="rounded-[26px] bg-white/12 p-5 backdrop-blur">
                  <p className="text-sm font-bold text-white/85">Nextgen mall, South C, Nairobi, Kenya</p>
                  <p className="mt-2 text-xs text-white/65">Delivery available • M-Pesa accepted • Custom orders</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <div className="md:hidden">
                <Image src="/logo.png" alt="lolo's craving" width={100} height={70} className="h-16 w-auto object-contain" priority />
              </div>

              <div className="mt-8 md:mt-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Welcome</p>
                <h2 className="mt-3 text-4xl font-black text-[#221b18] md:text-5xl">Sign in to continue</h2>
                <p className="mt-4 max-w-md leading-7 text-[#7e7169]">
                  Please enter your name and phone number to open the store.
                </p>
              </div>

              <form onSubmit={submit} className="mt-8 grid gap-5">
                <div>
                  <label className="label">Full name</label>
                  <input
                    name="name"
                    className="input mt-2"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label className="label">Phone number</label>
                  <input
                    name="phone"
                    className="input mt-2"
                    placeholder="07... or +254..."
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                    {error}
                  </div>
                )}

                <button className="tap-animate rounded-2xl bg-[#9b6128] px-6 py-4 text-base font-black text-white shadow-[0_14px_34px_rgba(155,97,40,0.22)]">
                  Continue to Home
                </button>

                <p className="text-center text-xs leading-5 text-[#7e7169]">
                  Your details are saved on this device to make ordering faster.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
