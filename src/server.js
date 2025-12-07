import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import { config } from './config/env.js'
import { seedData } from './utils/seed.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('tiny'))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api', healthRoutes)

app.use(errorHandler)

const start = async () => {
  await connectDB()
  await seedData()
  app.listen(config.port, () => {
    console.log(`API escuchando en puerto ${config.port}`)
  })
}

start()
