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
// Auto-detect site URL from Railway environment or request headers
// No need to set SITE variable manually - it will be detected automatically
const getSiteUrl = () => {
  // Try multiple environment variable sources (Railway provides these automatically)
  const url =
    process.env.PUBLIC_SITE_URL ||
    process.env.RAILWAY_PUBLIC_DOMAIN ||
    process.env.RAILWAY_STATIC_URL ||
    process.env.RAILWAY_ENVIRONMENT_URL ||
    process.env.SITE

  // Validate and format URL
  if (url && typeof url === 'string' && url.trim() !== '') {
    const trimmedUrl = url.trim()
    // Ensure URL has protocol
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl
    }
    return `https://${trimmedUrl}`
  }

  // Fallback: Try to construct from Railway service name (if available)
  // Railway format: https://[service-name]-[project-id].up.railway.app
  if (process.env.RAILWAY_SERVICE_NAME && process.env.RAILWAY_PROJECT_ID) {
    return `https://${process.env.RAILWAY_SERVICE_NAME}-${process.env.RAILWAY_PROJECT_ID}.up.railway.app`
  }

  // Fallback for local development
  return 'https://localhost:4321'
}

export default defineConfig({
  output: 'server', // Server mode for Keystatic (pages will be prerendered)
  adapter: node({
    mode: 'standalone',
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
