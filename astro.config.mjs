import { defineConfig } from 'astro/config'
import partytown from '@astrojs/partytown'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import lottie from 'astro-integration-lottie'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import node from '@astrojs/node'

// https://astro.build/config
// Get site URL from environment, with fallback
// Railway: Set PUBLIC_SITE_URL environment variable to your Railway domain
// Example: https://solid-production.up.railway.app
const getSiteUrl = () => {
  // Try multiple environment variable sources
  const url =
    process.env.PUBLIC_SITE_URL ||
    process.env.RAILWAY_PUBLIC_DOMAIN ||
    process.env.RAILWAY_STATIC_URL

  // Validate and format URL
  if (url && typeof url === 'string' && url.trim() !== '') {
    const trimmedUrl = url.trim()
    // Ensure URL has protocol
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl
    }
    return `https://${trimmedUrl}`
  }

  // Fallback for local development (should not be used in production)
  return 'https://localhost:4321'
}

export default defineConfig({
  output: 'server', // Server mode for Keystatic (pages will be prerendered)
  adapter: node({
    mode: 'standalone'
  }),
  site: getSiteUrl(),
  integrations: [
    icon(),
    sitemap(),
    lottie(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    react(),
    markdoc(),
    keystatic({
      configPath: './keystatic.config.ts',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // No adapter needed for static site on Railway
  // adapter: netlify(),
})
