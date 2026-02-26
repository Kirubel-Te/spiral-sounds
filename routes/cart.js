import express from 'express'
import { addToCart, cartCount, getAll, deleteItem, deleteAll } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add', addToCart)
cartRouter.get('/cart-count', cartCount)
cartRouter.delete('/all', deleteAll)
cartRouter.delete('/:itemId', deleteItem)
cartRouter.get('/', getAll)
export default cartRouter