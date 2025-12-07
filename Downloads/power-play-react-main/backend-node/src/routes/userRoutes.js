import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = Router()

router.get('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json(users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })))
  } catch (error) {
    next(error)
  }
})

router.put('/:id/role', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { role } = req.body
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido' })
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'No puedes eliminar un administrador' })
    }
    await user.deleteOne()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default router
