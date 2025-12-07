import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  sku: { type: String },
  quantity: { type: Number, default: 1 }
}, { _id: false })

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: { type: [cartItemSchema], default: [] }
}, {
  timestamps: true
})

export const Cart = mongoose.model('Cart', cartSchema)
