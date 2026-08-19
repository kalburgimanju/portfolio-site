# Stripe Setup Checklist

Create these products in Stripe Dashboard and paste the Payment Link URLs into `data/books.js`.

## Steps for Each Book

1. Go to Stripe Dashboard → Products → Add product
2. Enter the book title and price
3. Enable one-time payment
4. Create a Payment Link
5. Copy the payment link URL
6. Paste it into `stripeLink` in `data/books.js`
7. Optional: set post-payment redirect to `https://kalburgimanju.github.io/portfolio-site/success/<slug>`

## Book List

| # | Slug | Title | Suggested Price | Status |
|---|------|-------|-----------------|--------|
| 1 | `100-startup-business-ideas` | 100 startup business ideas | $9.99 USD | ⏳ Pending |
| 2 | `building-10-profitable-ai-agents` | Building 10 profitable AI Agents | $9.99 USD | ⏳ Pending |
| 3 | `building-agent-loop` | Building Agent loop | $9.99 USD | ⏳ Pending |
| 4 | `bulk-test-a` | Bulk Test A | $9.99 USD | ⏳ Pending |
| 5 | `bulk-test-b` | Bulk Test B | $9.99 USD | ⏳ Pending |
| 6 | `how-to-become-mentally-and-physically-fit-after-40-years` | How to become mentally and physically fit after 40 years | $9.99 USD | ⏳ Pending |
| 7 | `how-to-become-positive-in-your-difficult-times` | How to become positive in your difficult times | $9.99 USD | ⏳ Pending |
| 8 | `how-to-overcome-from-failures-in-life` | How to overcome from failures in life | $9.99 USD | ⏳ Pending |
| 9 | `learning-agi-and-super-agents` | learning AGI and Super Agents | $9.99 USD | ⏳ Pending |
| 10 | `learning-guide-on-how-to-start-a-real-estate-business-in-karnataka` | Learning guide on how to start a real estate business in Karnataka. | $9.99 USD | ⏳ Pending |
| 11 | `learning-guide-on-how-to-start-a-your-own-business-in-india` | Learning guide on how to start a your own business in india | $9.99 USD | ⏳ Pending |
| 12 | `live-run-test` | Live Run Test | $9.99 USD | ⏳ Pending |
| 13 | `python-for-everyone` | Python for everyone | $9.99 USD | ⏳ Pending |

## After Setup

1. Run `npm run build` to regenerate the site
2. Commit and push to trigger GitHub Pages deployment
3. Test the payment flow in Stripe test mode

