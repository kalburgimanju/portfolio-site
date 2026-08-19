/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio-site',
  assetPrefix: '/portfolio-site',
}

module.exports = nextConfig
