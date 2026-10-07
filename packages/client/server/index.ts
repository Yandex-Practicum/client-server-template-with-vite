import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || 80
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'spa',
    })

    app.use(vite.middlewares)
  } else {
    const distPath = path.join(clientPath, 'dist/client')

    app.use(express.static(distPath))
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  app.listen(port, () => {
    console.log(`Client is listening on http://localhost:${port}`)
  })
}

createServer()
