/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.DOCKER_BUILD === '1' ? 'standalone' : undefined,

  async redirects() {
    return [
      { source: '/hermes', destination: '/assistant', permanent: true },
      { source: '/demo', destination: '/analyze', permanent: true },
      { source: '/method', destination: '/#how-it-works', permanent: true },
      { source: '/operator', destination: '/assistant', permanent: true },
      { source: '/zeus', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
