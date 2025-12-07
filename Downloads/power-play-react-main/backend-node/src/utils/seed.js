import bcrypt from 'bcryptjs'
import { config } from '../config/env.js'
import { User } from '../models/User.js'
import { Category } from '../models/Category.js'
import { slugify } from './slugify.js'

const defaultCategories = [
  { name: 'Consolas', slug: 'consolas' },
  { name: 'Accesorios', slug: 'accesorios' },
  { name: 'Videojuegos', slug: 'videojuegos' },
  { name: 'Juegos de Mesa', slug: 'juegos-mesa' }
]

export const seedData = async () => {
  if (config.admin.email && config.admin.password) {
    const exists = await User.findOne({ email: config.admin.email })
    if (!exists) {
      const hashed = await bcrypt.hash(config.admin.password, 10)
      await User.create({
        name: config.admin.name,
        email: config.admin.email,
        password: hashed,
        role: 'admin'
      })
      console.log('Usuario admin creado')
    }
  }

  for (const cat of defaultCategories) {
    const slug = cat.slug || slugify(cat.name)
    await Category.updateOne({ slug }, { name: cat.name, slug }, { upsert: true })
  }
}
