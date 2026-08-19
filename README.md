# Manjunath Kalburgi — Author Portfolio

Personal branding portfolio and ebook storefront built with **Next.js 14** and **Tailwind CSS**. Each book gets its own marketing page, and buyers are routed through **Stripe** to a success page that shares the **Google Drive PDF download link**.

- Live site: `https://<your-username>.github.io/portfolio-site/`
- Repo: `https://github.com/<your-username>/portfolio-site`

## Features

- Homepage with hero, stats, featured books grid, and full catalog
- Per-book pages (`/books/[slug]`) with cover, blurb, chapters, pricing, and buy CTA
- Order success page (`/success/[slug]`) showing the PDF download link
- Auto-generated book catalog from `ebook-generator/projects`
- GitHub Pages deployment via GitHub Actions

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configure a Book for Sale

Edit `data/books.js`. For each book, fill in:

- `price` — sale price in USD
- `stripeLink` — your Stripe Payment Link URL
- `driveLink` — Google Drive share link to the PDF

Example:

```json
{
  "slug": "learning-ai-agents-in-10-days",
  "title": "Learning AI Agents in 10 Days",
  "author": "Manjunath Kalburgi",
  "hasPdf": true,
  "coverPng": "/covers/learning-ai-agents-in-10-days/cover.png",
  "price": 9.99,
  "currency": "USD",
  "stripeLink": "https://buy.stripe.com/...",
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

## Stripe Setup

1. Create a product in Stripe for each book
2. Use **Payment Links** (recommended for static sites)
3. Paste the payment link into `stripeLink` in `data/books.js`
4. Enable the Stripe webhook to send customers to `/success/[slug]` after payment

## Google Drive Setup

1. Upload the final `book.pdf` to Google Drive
2. Right-click → Share → “Anyone with the link can view”
3. Copy the link and paste it into `driveLink` in `data/books.js`

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
│   ├── books/[slug]/page.js    # Individual book page
│   ├── success/[slug]/page.js  # Order success / download page
│   ├── layout.js               # Root layout + metadata
│   ├── page.js                 # Homepage
│   └── globals.css             # Tailwind + custom styles
├── data/
│   └── books.js                # Auto-generated book catalog
├── public/
│   └── covers/                 # Book cover images
├── scripts/
│   ├── extract-books.js        # Generate books.js from ebook-generator
│   └── copy-covers.js          # Copy covers to public/
├── next.config.js              # Static export config
├── tailwind.config.js          # Tailwind theme
└── package.json
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Stripe Payment Links](https://stripe.com/docs/payment-links) — Checkout without backend
- GitHub Actions — CI/CD for GitHub Pages
- Google Drive — PDF hosting and delivery

## License

Private — all rights reserved.
