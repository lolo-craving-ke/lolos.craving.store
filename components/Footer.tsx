import { storeConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-black text-plum">{storeConfig.name}</h3>
          <p className="mt-2 text-sm text-ink/60">Official online store. Delivery available in Nairobi.</p>
        </div>
        <div>
          <h4 className="font-bold">Contact</h4>
          <p className="mt-2 text-sm">WhatsApp: +{storeConfig.whatsapp}</p>
          <p className="text-sm">Currency: {storeConfig.currency}</p>
        </div>
        <div>
          <h4 className="font-bold">Quick links</h4>
          <a className="mt-2 block text-sm text-plum" href={storeConfig.maps} target="_blank">Open Google Maps</a>
          <a className="block text-sm text-plum" href="/admin/login">Admin login</a>
        </div>
      </div>
    </footer>
  );
}
