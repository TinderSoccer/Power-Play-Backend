import { Router } from 'express'
import { Cart } from '../models/Cart.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ userId })
  if (!cart) {
    cart = await Cart.create({ userId, items: [] })
  }
  return cart
}

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const cart = await ensureCart(req.user._id.toString())
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/', requireAuth, async (req, res, next) => {
  try {
    const { items = [] } = req.body
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id.toString() },
      { items },
      { new: true, upsert: true }
    )
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/', requireAuth, async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id.toString() },
      { items: [] },
      { new: true }
    )
    res.json(cart || { items: [] })
  } catch (error) {
    next(error)
  }
})

export default router
