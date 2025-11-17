import { createServer } from 'http'
import { readFileSync, statSync } from 'fs'
import { extname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

const PORT = process.env.PORT || 4321
const HOST = '0.0.0.0'
const DIST_DIR = resolve(__dirname, 'dist')

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
}

function getMimeType(path) {
  const ext = extname(path).toLowerCase()
  return MIME_TYPES[ext] || 'application/octet-stream'
}

function serveFile(filePath, res) {
  try {
    const stats = statSync(filePath)
    if (!stats.isFile()) {
      console.log(`Not a file: ${filePath}`)
      return false
    }

    const content = readFileSync(filePath)
    const mimeType = getMimeType(filePath)
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': content.length,
      'Cache-Control': 'public, max-age=3600'
    })
    res.end(content)
    return true
  } catch (err) {
    console.log(`Error serving file ${filePath}:`, err.message)
    return false
  }
}

function getFilePath(urlPath) {
  // Remove query string
  const path = urlPath.split('?')[0]
  
  // Default to index.html for directories
  let filePath = path === '/' ? '/index.html' : path
  if (filePath.endsWith('/')) {
    filePath += 'index.html'
  }
  
  // Remove leading slash
  filePath = filePath.replace(/^\//, '')
  
  return resolve(DIST_DIR, filePath)
}

const server = createServer((req, res) => {
  try {
    // Log request for debugging (always log, even if it fails)
    const requestInfo = `${req.method} ${req.url} - ${req.headers['user-agent'] || 'unknown'}`
    console.log(`📥 ${requestInfo}`)
    console.log(`🔗 Headers:`, JSON.stringify(req.headers))
    
    // Health check endpoint
    if (req.url === '/health' || req.url === '/healthz') {
      console.log(`✅ Health check requested`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString(), port: PORT }))
      return
    }
    
    const filePath = getFilePath(req.url)
    console.log(`Attempting to serve: ${filePath}`)
    
    if (serveFile(filePath, res)) {
      console.log(`Served: ${req.url}`)
      return
    }
    
    // Try index.html for 404s (SPA routing)
    if (req.url !== '/index.html' && !req.url.includes('.')) {
      const indexPath = resolve(DIST_DIR, 'index.html')
      console.log(`Trying index.html for: ${req.url}`)
      if (serveFile(indexPath, res)) {
        return
      }
    }
    
    // 404
    console.log(`404: ${req.url} -> ${filePath}`)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  } catch (error) {
    console.error('Server error:', error)
    console.error(error.stack)
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('500 Internal Server Error')
    }
  }
})

server.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`)
  console.log(`📁 Serving files from: ${DIST_DIR}`)
  console.log(`🔌 PORT environment variable: ${process.env.PORT || 'not set, using default 4321'}`)
  console.log(`🌐 Server is ready to accept connections`)
  console.log(`📡 Listening on all interfaces (0.0.0.0)`)
  console.log(`🚀 Ready to serve requests!`)
  
  // Verify dist directory exists
  try {
    const stats = statSync(DIST_DIR)
    if (stats.isDirectory()) {
      console.log(`✅ Dist directory exists: ${DIST_DIR}`)
      const indexPath = resolve(DIST_DIR, 'index.html')
      if (statSync(indexPath).isFile()) {
        console.log(`✅ index.html found`)
      } else {
        console.error(`❌ index.html NOT found at ${indexPath}`)
      }
    }
  } catch (err) {
    console.error(`❌ Dist directory error:`, err.message)
  }
  
  // Test that we can actually serve a file
  try {
    const testPath = resolve(DIST_DIR, 'index.html')
    const testContent = readFileSync(testPath)
    console.log(`✅ Test read successful: ${testContent.length} bytes from index.html`)
  } catch (err) {
    console.error(`❌ Test read failed:`, err.message)
  }
})

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

