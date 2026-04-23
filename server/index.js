import 'dotenv/config'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import express from 'express'
import cors from 'cors'

const PORT = Number(process.env.PORT || 5174)
const SITE_DATA_FILE =
  process.env.SITE_DATA_FILE ||
  path.join(process.cwd(), 'server', 'data', 'site-data.json')

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || '').trim()
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || '').trim()
const CORS_ORIGIN = (process.env.CORS_ORIGIN || '').trim()

const tokenStore = new Map()
const TOKEN_TTL_MS = 6 * 60 * 60 * 1000

function createToken() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return crypto.randomBytes(32).toString('hex')
}

function getBearerToken(request) {
  const headerValue = request.get('authorization') || ''
  const prefix = 'Bearer '
  if (!headerValue.startsWith(prefix)) {
    return ''
  }
  return headerValue.slice(prefix.length).trim()
}

function isTokenValid(token) {
  const record = tokenStore.get(token)
  if (!record) {
    return false
  }
  if (Date.now() > record.expiresAt) {
    tokenStore.delete(token)
    return false
  }
  return true
}

function requireAdmin(request, response, next) {
  const token = getBearerToken(request)
  if (!token || !isTokenValid(token)) {
    response.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}

async function readSiteData() {
  try {
    const content = await fs.readFile(SITE_DATA_FILE, 'utf8')
    const parsed = JSON.parse(content)
    if (!parsed || typeof parsed !== 'object') {
      return {}
    }
    return parsed
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return {}
    }
    throw error
  }
}

async function writeSiteData(nextValue) {
  await fs.mkdir(path.dirname(SITE_DATA_FILE), { recursive: true })
  const tempFile = `${SITE_DATA_FILE}.tmp`
  await fs.writeFile(tempFile, JSON.stringify(nextValue, null, 2), 'utf8')
  try {
    await fs.rename(tempFile, SITE_DATA_FILE)
  } catch (error) {
    const code = error?.code
    if (code === 'EEXIST' || code === 'EPERM' || code === 'EACCES') {
      try {
        await fs.unlink(SITE_DATA_FILE)
      } catch (unlinkError) {
        if (unlinkError?.code !== 'ENOENT') {
          throw unlinkError
        }
      }
      await fs.rename(tempFile, SITE_DATA_FILE)
      return
    }
    throw error
  }
}

const app = express()

app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN : true,
    credentials: true,
  }),
)

app.use(express.json({ limit: '10mb' }))

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.get('/api/site-data', async (_request, response) => {
  const data = await readSiteData()
  response.set('Cache-Control', 'no-store')
  response.json(data)
})

app.post('/api/admin/login', (request, response) => {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    response.status(500).json({ error: 'Admin credentials are not configured on the server.' })
    return
  }

  const username = String(request.body?.username || '').trim()
  const password = String(request.body?.password || '').trim()

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    response.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const token = createToken()
  const expiresAt = Date.now() + TOKEN_TTL_MS
  tokenStore.set(token, { expiresAt })

  response.json({ token, expiresAt })
})

app.put('/api/site-data', requireAdmin, async (request, response) => {
  const nextValue = request.body
  if (!nextValue || typeof nextValue !== 'object' || Array.isArray(nextValue)) {
    response.status(400).json({ error: 'Invalid site data' })
    return
  }

  await writeSiteData(nextValue)
  response.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Site data server running on http://localhost:${PORT}`)
  console.log(`Site data file: ${SITE_DATA_FILE}`)
})
