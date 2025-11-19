import type { MiddlewareHandler } from 'astro'

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, url } = context
  
  // Log all Keystatic API requests
  if (url.pathname.startsWith('/api/keystatic')) {
    console.log('=== Keystatic API Request ===')
    console.log('Method:', request.method)
    console.log('URL:', url.toString())
    console.log('Pathname:', url.pathname)
    console.log('Search params:', url.searchParams.toString())
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    
    // Check environment variables
    console.log('Environment check:')
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    console.log('- KEYSTATIC_SECRET:', process.env.KEYSTATIC_SECRET ? 'SET' : 'MISSING')
    console.log('- KEYSTATIC_GITHUB_CLIENT_ID:', process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'MISSING')
    console.log('- KEYSTATIC_GITHUB_CLIENT_SECRET:', process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING')
  }
  
  try {
    const response = await next()
    
    if (url.pathname.startsWith('/api/keystatic')) {
      console.log('=== Keystatic API Response ===')
      console.log('Status:', response.status)
      console.log('Status Text:', response.statusText)
    }
    
    return response
  } catch (error) {
    console.error('=== Keystatic API Error ===')
    console.error('Error:', error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw error
  }
}

