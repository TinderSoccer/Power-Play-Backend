import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  id: String,
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  sku: String
}, { _id: false })

const orderFormSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  postalCode: String,
  transferenceConfirmed: Boolean,
  transactionId: String
}, { _id: false })

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { type: String, default: 'Pendiente' },
  cartItems: { type: [orderItemSchema], default: [] },
  formData: orderFormSchema,
  subtotal: Number,
  shipping: Number,
  total: Number
}, {
  timestamps: true
})

export const Order = mongoose.model('Order', orderSchema)
