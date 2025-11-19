import type { MiddlewareHandler } from 'astro'

// Set NODE_ENV to production if not set (for Railway deployments)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, url } = context
  
  // Log all Keystatic API requests
  if (url.pathname.startsWith('/api/keystatic')) {
    console.log('=== Keystatic API Request ===')
    console.log('Method:', request.method)
    console.log('URL:', url.toString())
    console.log('Pathname:', url.pathname)
    console.log('Search params:', url.searchParams.toString())
    
    // Special logging for OAuth callback
    if (url.pathname.includes('/oauth/callback')) {
      const code = url.searchParams.get('code')
      const error = url.searchParams.get('error')
      const errorDescription = url.searchParams.get('error_description')
      console.log('=== OAuth Callback Details ===')
      console.log('Code:', code ? `${code.substring(0, 10)}...` : 'MISSING')
      console.log('Error:', error || 'none')
      console.log('Error Description:', errorDescription || 'none')
    }
    
    // Check environment variables
    console.log('Environment check:')
    console.log('- NODE_ENV:', process.env.NODE_ENV || 'undefined (will default to production)')
    console.log('- KEYSTATIC_SECRET:', process.env.KEYSTATIC_SECRET ? 'SET' : 'MISSING')
    console.log('- KEYSTATIC_GITHUB_CLIENT_ID:', process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'MISSING')
    console.log('- KEYSTATIC_GITHUB_CLIENT_SECRET:', process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING')
    
    // Verify OAuth app configuration
    if (url.pathname.includes('/oauth/callback') || url.pathname.includes('/login')) {
      console.log('=== OAuth Configuration Check ===')
      console.log('Expected Callback URL: https://solid-production.up.railway.app/api/keystatic/github/oauth/callback')
      console.log('Client ID in use:', process.env.KEYSTATIC_GITHUB_CLIENT_ID)
    }
  }
  
  try {
    const response = await next()
    
    if (url.pathname.startsWith('/api/keystatic')) {
      console.log('=== Keystatic API Response ===')
      console.log('Status:', response.status)
      console.log('Status Text:', response.statusText)
      
      // If 401, try to read the response body to see the error
      if (response.status === 401) {
        const clonedResponse = response.clone()
        try {
          const text = await clonedResponse.text()
          console.log('401 Response Body:', text)
        } catch (e) {
          console.log('Could not read 401 response body')
        }
      }
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

