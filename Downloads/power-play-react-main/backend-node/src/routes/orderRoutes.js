import { Router } from 'express'
import { Order } from '../models/Order.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id.toString() }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const payload = {
      userId: req.user._id.toString(),
      status: 'Pendiente',
      cartItems: req.body.cartItems || [],
      formData: req.body.formData,
      subtotal: req.body.subtotal || 0,
      shipping: req.body.shipping || 0,
      total: req.body.total || 0
    }
    const order = await Order.create(payload)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/admin', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/status', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})

export default router
