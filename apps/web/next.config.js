/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/hermes', destination: '/analyze', permanent: true },
      { source: '/demo', destination: '/analyze', permanent: true },
      { source: '/method', destination: '/api-docs', permanent: true },
      { source: '/operator', destination: '/agents', permanent: true },
    ]
  },
}

module.exports = nextConfig
