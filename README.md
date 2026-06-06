# lolo's craving store

Professional online store + admin dashboard for **lolo's craving**.

## Features

- Official store homepage
- Product listing
- Shopping cart
- Checkout and order creation
- Admin login
- Add categories
- Add products from admin
- Upload product image or paste image URL
- Manage product availability
- Manage orders and payment status
- PostgreSQL database via Prisma
- Ready for Render deployment

## Store data

- Store name: lolo's craving
- WhatsApp: +254113534345
- Currency: KSH
- Delivery: Available
- M-Pesa: Available
- Google Maps: https://maps.app.goo.gl/hrcHuhz9ALqXTUyA9

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Add your database URL in `.env`.

4. Push database schema:

```bash
npm run prisma:push
```

5. Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:3000/admin/login
```

## Render deployment

### Recommended method

1. Upload this project to GitHub.
2. Create a PostgreSQL database on Render.
3. Create a new Web Service on Render and connect the GitHub repository.
4. Use these commands:

```text
Build Command:
npm install && npm run build

Start Command:
npm start
```

5. Add environment variables:

```env
DATABASE_URL=your-render-postgresql-connection-string
ADMIN_EMAIL=admin@loloscraving.com
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=long-random-secret
NEXT_PUBLIC_STORE_NAME=lolo's craving
NEXT_PUBLIC_WHATSAPP_NUMBER=254113534345
NEXT_PUBLIC_GOOGLE_MAPS_LINK=https://maps.app.goo.gl/hrcHuhz9ALqXTUyA9
NEXT_PUBLIC_CURRENCY=KSH
```

## Notes

Product images are stored as either:

1. Image URL, or
2. Uploaded image encoded in the database.

For a larger store with many images, use Cloudinary or another image storage provider later.
