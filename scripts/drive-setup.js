const fs = require('fs')
const path = require('path')

const booksPath = path.join(__dirname, '..', 'data', 'books.js')
const outputPath = path.join(__dirname, '..', 'docs', 'drive-setup.md')

const books = require(booksPath)

const withPdf = books.filter(b => b.hasPdf)

let md = `# Google Drive Setup\n\n`
md += `Your books are available in Google Drive:\n`
md += `${'https://drive.google.com/drive/folders/1RfWRuJskPmsZJ_QddMdqLXJuXEWdBnWX?usp=drive_link'}\n\n`
md += `## Steps\n\n`
md += `1. Open the Drive folder above\n`
md += `2. For each book below, find the matching \`book.pdf\` file\n`
md += `3. Right-click the file → Share → &quot;Anyone with the link can view&quot;\n`
md += `4. Copy the share link and paste it into \`driveLink\` in \`data/books.js\`\n\n`
md += `## Book Mapping\n\n`
md += `| Slug | Expected PDF filename | Drive Link |\n`
md += `|------|----------------------|------------|\n`

withPdf.forEach(book => {
  const pdfName = `${book.slug}.pdf`
  md += `| \`${book.slug}\` | \`${pdfName}\` | <pending> |\n`
})

md += `\n## After Setup\n\n`
md += `1. Run \`npm run build\` to regenerate the site\n`
md += `2. Commit and push to deploy\n`

if (!fs.existsSync(path.join(__dirname, '..', 'docs'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'docs'), { recursive: true })
}

fs.writeFileSync(outputPath, md)
console.log(`Drive setup guide written to ${outputPath}`)
console.log(`${withPdf.length} books need Drive links configured.`)
