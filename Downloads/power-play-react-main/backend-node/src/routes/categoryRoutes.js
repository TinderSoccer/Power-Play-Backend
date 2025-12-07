import { Router } from 'express'
import { Category } from '../models/Category.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { slugify } from '../utils/slugify.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { name, slug, description } = req.body
    const payload = {
      name,
      slug: slug || slugify(name),
      description
    }
    const category = await Category.create(payload)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }
    res.json(category)
  } catch (error) {
    next(error)
  }
})

export default router
