import express from 'express'
import { getCurrentUser } from '../controllers/meController.js'

const meRouter = express.Router()

meRouter.get('/', getCurrentUser)

export default meRouter