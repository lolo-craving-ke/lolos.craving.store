import { storeConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="border-t border-[#efe3f7] bg-white/80">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-black text-[#4b235f]">{storeConfig.name}</h3>
          <p className="mt-2 text-sm text-plum/60">Official page and online store. Delivery available in Nairobi.</p>
        </div>
        <div>
          <h4 className="font-black text-plum">Contact</h4>
          <p className="mt-2 text-sm text-plum/70">WhatsApp: +{storeConfig.whatsapp}</p>
          <p className="text-sm text-plum/70">Currency: {storeConfig.currency}</p>
        </div>
        <div>
          <h4 className="font-black text-plum">Quick links</h4>
          <a className="mt-2 block text-sm font-bold text-[#8f63c8]" href={storeConfig.maps} target="_blank">Open Google Maps</a>
          <a className="block text-sm font-bold text-[#8f63c8]" href="/products">View menu</a>
          <a className="block text-sm font-bold text-[#8f63c8]" href="/admin/login">Admin login</a>
        </div>
      </div>
    </footer>
  );
}
