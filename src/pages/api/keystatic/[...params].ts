import type { APIRoute } from 'astro'
import { makeHandler } from '@keystatic/core/api'
import config from '../../../../keystatic.config'

const handler = makeHandler({
  config,
})

export const ALL: APIRoute = async (context) => {
  const { request, params } = context
  
  console.log('=== Keystatic API Request ===')
  console.log('Method:', request.method)
  console.log('URL:', request.url)
  console.log('Params:', params)
  console.log('Storage config:', config.storage)
  console.log('Environment variables:')
  console.log('- KEYSTATIC_SECRET:', process.env.KEYSTATIC_SECRET ? '✓ SET' : '✗ MISSING')
  console.log('- KEYSTATIC_GITHUB_CLIENT_ID:', process.env.KEYSTATIC_GITHUB_CLIENT_ID ? `✓ ${process.env.KEYSTATIC_GITHUB_CLIENT_ID}` : '✗ MISSING')
  console.log('- KEYSTATIC_GITHUB_CLIENT_SECRET:', process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? '✓ SET (hidden)' : '✗ MISSING')
  console.log('- NODE_ENV:', process.env.NODE_ENV)
  console.log('- RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT)
  
  try {
    const response = await handler(context)
    console.log('Response status:', response.status)
    return response
  } catch (error) {
    console.error('=== Keystatic API Error ===')
    console.error('Error:', error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}

