const fs = require('fs')
const path = require('path')

const booksPath = path.join(__dirname, '..', 'data', 'books.js')
const outputPath = path.join(__dirname, '..', 'docs', 'stripe-setup-checklist.md')

const books = require(booksPath)

const sellable = books.filter(b => b.hasPdf)

let md = `# Stripe Setup Checklist\n\n`
md += `Create these products in Stripe Dashboard and paste the Payment Link URLs into \`data/books.js\`.\n\n`
md += `## Steps for Each Book\n\n`
md += `1. Go to Stripe Dashboard → Products → Add product\n`
md += `2. Enter the book title and price\n`
md += `3. Enable one-time payment\n`
md += `4. Create a Payment Link\n`
md += `5. Copy the payment link URL\n`
md += `6. Paste it into \`stripeLink\` in \`data/books.js\`\n`
md += `7. Optional: set post-payment redirect to \`https://kalburgimanju.github.io/portfolio-site/success/<slug>\`\n\n`
md += `## Book List\n\n`
md += `| # | Slug | Title | Suggested Price | Status |\n`
md += `|---|------|-------|-----------------|--------|\n`

sellable.forEach((book, idx) => {
  const status = book.stripeLink ? '✅ Configured' : '⏳ Pending'
  md += `| ${idx + 1} | \`${book.slug}\` | ${book.title} | $${book.price} ${book.currency} | ${status} |\n`
})

md += `\n## After Setup\n\n`
md += `1. Run \`npm run build\` to regenerate the site\n`
md += `2. Commit and push to trigger GitHub Pages deployment\n`
md += `3. Test the payment flow in Stripe test mode\n\n`

if (!fs.existsSync(path.join(__dirname, '..', 'docs'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'docs'), { recursive: true })
}

fs.writeFileSync(outputPath, md)
console.log(`Stripe setup checklist written to ${outputPath}`)
console.log(`\n${sellable.length} books need Stripe products configured.`)
