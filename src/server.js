import app from './app.js'
import { connectDB } from './config/db.js'
import { config } from './config/env.js'
import { seedData } from './utils/seed.js'

const start = async () => {
  await connectDB()
  await seedData()
  app.listen(config.port, () => {
    console.log(`API escuchando en puerto ${config.port}`)
  })
}

start().catch((error) => {
  console.error('Error iniciando el servidor', error)
  process.exit(1)
})
