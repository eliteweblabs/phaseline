import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  console.log('=== TEST LOGGING ENDPOINT HIT ===')
  console.log('Timestamp:', new Date().toISOString())
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('KEYSTATIC_SECRET:', process.env.KEYSTATIC_SECRET ? 'SET' : 'MISSING')
  console.log('KEYSTATIC_GITHUB_CLIENT_ID:', process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'MISSING')
  console.log('KEYSTATIC_GITHUB_CLIENT_SECRET:', process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING')
  
  return new Response(
    JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Logging test endpoint - check Railway HTTP logs',
      env: {
        NODE_ENV: process.env.NODE_ENV,
        KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET ? 'SET' : 'MISSING',
        KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'MISSING',
        KEYSTATIC_GITHUB_CLIENT_SECRET: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING',
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

