const fs = require('fs')
const path = require('path')

const PROJECTS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'ebook-generator',
  'projects'
)
const PUBLIC_COVERS = path.join(__dirname, '..', 'public', 'covers')

try {
  if (!fs.existsSync(PUBLIC_COVERS)) {
    fs.mkdirSync(PUBLIC_COVERS, { recursive: true })
  }
  
  const projects = fs.readdirSync(PROJECTS_DIR)
  let copied = 0
  
  for (const projName of projects.sort()) {
    const projDir = path.join(PROJECTS_DIR, projName)
    const stat = fs.statSync(projDir)
    if (!stat.isDirectory()) continue
    
    const mjPath = path.join(projDir, 'manuscript.json')
    if (!fs.existsSync(mjPath)) continue
    
    const srcPng = path.join(projDir, 'cover.png')
    if (!fs.existsSync(srcPng)) continue
    
    const destDir = path.join(PUBLIC_COVERS, projName)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    const destPng = path.join(destDir, 'cover.png')
    fs.copyFileSync(srcPng, destPng)
    copied++
  }
  
  console.log(`Copied ${copied} cover images to ${PUBLIC_COVERS}`)
} catch (err) {
  console.error('Error copying covers:', err.message)
  process.exit(1)
}
