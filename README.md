# Manjunath Kalburgi — Author Portfolio

Personal branding portfolio and ebook storefront built with **Next.js 14** and **Tailwind CSS**. Each book gets its own marketing page, and buyers are routed through **Stripe** to a success page that shares the **Google Drive PDF download link**.

- Live site: `https://kalburgimanju.github.io/portfolio-site/`
- Repo: `https://github.com/kalburgimanju/portfolio-site`

## Features

- Homepage with hero, stats, featured books grid, and full catalog
- Per-book pages (`/books/[slug]`) with cover, blurb, chapters, pricing, and buy CTA
- Order success page (`/success/[slug]`) showing the PDF download link
- User login/register with localStorage-backed accounts
- User dashboard showing owned books and reading progress
- Online book reader for purchased books
- Admin dashboard (`/admin`) with login `admin` / `admin`
- Admin overview: total books, sales, monthly revenue
- Admin purchases list with buyer emails and dates
- Admin book management: view, edit content, and upload new covers
- Auto-generated book catalog from `ebook-generator/projects`
- GitHub Pages deployment via GitHub Actions

## Security Note

**Do not commit Stripe secret keys to this repository.** This site is designed to work without backend code by using Stripe Payment Links. Keep your secret key only in Stripe Dashboard or a private server-side integration.

## Local Development

**Important:** Do not run `npm run build` inside Google Drive's mounted folder. Webpack can hit `ETIMEDOUT` reading files from cloud storage. Clone or copy the repo to a local path first.

```bash
# Recommended local path outside Google Drive
git clone https://github.com/kalburgimanju/portfolio-site.git ~/portfolio-site
cd ~/portfolio-site
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configure a Book for Sale

Edit `data/books.js`. For each book you want to sell, fill in:

- `price` — sale price in USD
- `paymentLink` — PayPal or other payment provider link
- `driveLink` — Google Drive share link to the PDF

Example:

```json
{
  "slug": "learning-ai-agents-in-10-days",
  "title": "Learning AI Agents in 10 Days",
  "author": "Manjunath Kalburgi",
  "hasPdf": true,
  "coverPng": "/portfolio-site/covers/learning-ai-agents-in-10-days/cover.png",
  "price": 9.99,
  "currency": "USD",
  "paymentLink": "https://www.paypal.com/...",
  "driveLink": "https://drive.google.com/file/d/.../view?usp=sharing"
}
```

### Regenerate Book Catalog

When you add new books in `ebook-generator/projects`:

```bash
npm run extract-books
npm run build
```

This refreshes `data/books.js` and copies new covers into `public/covers/`.

## PayPal Setup

Use **PayPal payment links/buttons** — no backend or secret key needed.

1. Run `node scripts/paypal-setup.js` to generate `docs/paypal-setup-checklist.md`
2. For each book in the checklist, create a PayPal payment link/button in your PayPal Business account
3. Copy the payment link URL and paste it into `paymentLink` in `data/books.js`
4. Optional: set the return/cancel URLs to:
   - Return: `https://kalburgimanju.github.io/portfolio-site/success/<slug>`
   - Cancel: `https://kalburgimanju.github.io/portfolio-site/books/<slug>`
5. After updating links, run `npm run build` and push to deploy

**Note:** Keep your PayPal API credentials private. This site uses direct payment links so no server-side integration is required.

## Google Drive Setup

1. Upload the final `book.pdf` to Google Drive
2. Right-click → Share → “Anyone with the link can view”
3. Copy the link and paste it into `driveLink` in `data/books.js`

## Auth & Admin

This site uses client-side auth backed by `localStorage`.

- **User login/register**: `/login`
- **User dashboard**: `/dashboard` — shows owned books and reading progress
- **Online reader**: `/reader/[slug]` — available after purchase
- **Admin login**: `admin` / `admin`
- **Admin dashboard**: `/admin` — overview, purchases, book editor

**Note:** Because this is a static site, purchase verification is simulated. In production, replace the localStorage purchase flow with a real payment webhook or backend verification.

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml`. Every push to `main` builds the site and deploys it automatically.

To enable GitHub Pages:

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` to trigger deployment

## Project Structure

```
portfolio-site/
├── app/
│   ├── about/page.js             # About the author
│   ├── admin/page.js             # Admin dashboard
│   ├── books/[slug]/page.js      # Individual book page
│   ├── components/
│   │   ├── BookActions.js        # Buy button + Stripe checkout
│   │   └── NavBar.js             # Site navigation
│   ├── context/
│   │   └── AuthContext.js        # Auth state + localStorage users
│   ├── dashboard/page.js         # User dashboard + library
│   ├── login/page.js             # Login / register
│   ├── reader/[slug]/page.js     # Online book reader
│   ├── success/[slug]/page.js    # Order success / download page
│   ├── layout.js                 # Root layout + metadata
│   ├── page.js                   # Homepage
│   ├── providers.js              # Auth provider wrapper
│   └── globals.css               # Tailwind + custom styles
├── data/
│   └── books.js                  # Auto-generated book catalog
├── docs/
│   ├── stripe-setup-checklist.md # Stripe product setup helper
│   └── drive-setup.md            # Google Drive link setup helper
├── public/
│   └── covers/                   # Book cover images
├── scripts/
│   ├── extract-books.js          # Generate books.js from ebook-generator
│   ├── copy-covers.js            # Copy covers to public/
│   ├── paypal-setup.js           # Generate PayPal checklist
│   └── drive-setup.js            # Generate Drive setup guide
├── next.config.js                # Static export config
├── tailwind.config.js            # Tailwind theme
└── package.json
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- PayPal — Checkout via payment links/buttons
- GitHub Actions — CI/CD for GitHub Pages
- Google Drive — PDF hosting and delivery

## License

Private — all rights reserved.
