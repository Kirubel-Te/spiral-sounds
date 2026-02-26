import express from 'express'
import { addToCart, cartCount } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add', addToCart)
cartRouter.get('/cart-count', cartCount)

export default cartRouter