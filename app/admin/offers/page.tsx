import { prisma } from '@/lib/prisma';
import { createOffer, deleteOffer, toggleOffer } from './actions';

export default async function OffersAdminPage({ searchParams }: { searchParams: { error?: string; success?: string } }) {
  const offers = await prisma.offer.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });

  return (
    <div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b6128]">Homepage</p>
        <h1 className="mt-2 text-4xl font-black">Special Offers</h1>
        <p className="mt-3 text-[#7e7169]">Create the offer cards that appear first on the homepage.</p>
      </div>

      {searchParams.error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">Could not save offer.</div>}
      {searchParams.success && <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-black text-green-700">Saved successfully.</div>}

      <form action={createOffer} className="admin-card mt-8 grid gap-5 p-6" encType="multipart/form-data">
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Offer title</label><input name="title" required className="input mt-2" placeholder="Get Special Offer" /></div>
          <div><label className="label">Discount text</label><input name="discountText" className="input mt-2" placeholder="Up to 40%" /></div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div><label className="label">Small label</label><input name="label" className="input mt-2" placeholder="Limited time" /></div>
          <div><label className="label">Button text</label><input name="buttonText" className="input mt-2" defaultValue="Shop Now" /></div>
          <div><label className="label">Sort order</label><input name="sortOrder" type="number" className="input mt-2" /></div>
        </div>
        <div><label className="label">Subtitle</label><textarea name="subtitle" className="input mt-2" rows={2} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="label">Image URL</label><input name="imageUrl" className="input mt-2" placeholder="Optional if you upload image" /></div>
          <div><label className="label">Upload offer image</label><input name="imageFile" type="file" accept="image/*" className="input mt-2" /></div>
        </div>
        <div><label className="label">Link</label><input name="link" className="input mt-2" defaultValue="/#products" /></div>
        <label className="flex items-center gap-2 text-sm font-black"><input type="checkbox" name="active" defaultChecked /> Active on homepage</label>
        <button className="admin-action w-fit">Add offer</button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {offers.map((offer) => (
          <div key={offer.id} className="admin-card overflow-hidden">
            <div className="h-44 bg-[#fbf4e8]">
              {offer.imageUrl ? <img src={offer.imageUrl} alt={offer.title} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm font-black text-[#7e7169]">No image</div>}
            </div>
            <div className="p-5">
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">{offer.title}</h3>
                  <p className="mt-1 text-sm text-[#7e7169]">{offer.label || 'No label'} • {offer.discountText || 'No discount text'}</p>
                </div>
                <span className="h-fit rounded-full bg-[#fbf4e8] px-3 py-1 text-xs font-black">{offer.active ? 'Active' : 'Hidden'}</span>
              </div>
              <p className="mt-3 text-sm text-[#7e7169]">{offer.subtitle}</p>
              <div className="mt-4 flex gap-3">
                <form action={toggleOffer}><input type="hidden" name="id" value={offer.id} /><input type="hidden" name="active" value={String(!offer.active)} /><button className="text-sm font-black text-[#9b6128] underline">{offer.active ? 'Hide' : 'Show'}</button></form>
                <form action={deleteOffer}><input type="hidden" name="id" value={offer.id} /><button className="text-sm font-black text-red-600 underline">Delete</button></form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
