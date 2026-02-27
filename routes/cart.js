import express from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { addToCart, cartCount, getAll, deleteItem, deleteAll } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add', requireAuth, addToCart)
cartRouter.get('/cart-count', requireAuth, cartCount)
cartRouter.delete('/all', requireAuth, deleteAll)
cartRouter.delete('/:itemId', requireAuth, deleteItem)
cartRouter.get('/', requireAuth, getAll)
export default cartRouter