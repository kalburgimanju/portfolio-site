const fs = require('fs')
const path = require('path')

const booksPath = path.join(__dirname, '..', 'data', 'books.js')
const outputPath = path.join(__dirname, '..', 'docs', 'paypal-setup-checklist.md')

const books = require(booksPath)

const sellable = books.filter(b => b.hasPdf)

let md = `# PayPal Setup Checklist\n\n`
md += `Create payment links/buttons in PayPal Business Dashboard and paste the URLs into \`data/books.js\`.\n\n`
md += `## Steps for Each Book\n\n`
md += `1. Log in to [PayPal Business](https://www.paypal.com/business)\n`
md += `2. Go to **Tools** → **PayPal Buttons** or **Payment Links**\n`
md += `3. Create a new button/payment link for the book\n`
md += `4. Set the price to match the book price in \`data/books.js\`\n`
md += `5. Copy the generated payment link URL\n`
md += `6. Paste it into \`paymentLink\` in \`data/books.js\`\n`
md += `7. Optional: set return/cancel URLs:\n`
md += `   - Return: \`https://kalburgimanju.github.io/portfolio-site/success/<slug>\`\n`
md += `   - Cancel: \`https://kalburgimanju.github.io/portfolio-site/books/<slug>\`\n\n`
md += `## Book List\n\n`
md += `| # | Slug | Title | Suggested Price | Status |\n`
md += `|---|------|-------|-----------------|--------|\n`

sellable.forEach((book, idx) => {
  const status = book.paymentLink || book.stripeLink ? '✅ Configured' : '⏳ Pending'
  md += `| ${idx + 1} | \`${book.slug}\` | ${book.title} | $${book.price} ${book.currency} | ${status} |\n`
})

md += `\n## After Setup\n\n`
md += `1. Run \`npm run build\` to regenerate the site\n`
md += `2. Commit and push to trigger GitHub Pages deployment\n`
md += `3. Test the payment flow in PayPal sandbox mode\n\n`

if (!fs.existsSync(path.join(__dirname, '..', 'docs'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'docs'), { recursive: true })
}

fs.writeFileSync(outputPath, md)
console.log(`PayPal setup checklist written to ${outputPath}`)
console.log(`\n${sellable.length} books need PayPal payment links configured.`)
