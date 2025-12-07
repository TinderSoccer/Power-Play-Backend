import app from '../src/app.js'
import { connectDB } from '../src/config/db.js'
import { seedData } from '../src/utils/seed.js'

let initialized = false
let initializingPromise

const ensureInitialized = async () => {
  if (initialized) return
  if (!initializingPromise) {
    initializingPromise = (async () => {
      await connectDB()
      await seedData()
      initialized = true
    })()
  }
  return initializingPromise
}

export default async function handler(req, res) {
  await ensureInitialized()
  return app(req, res)
}
