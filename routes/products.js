import express from 'express';
// import { getProducts } from '../controllers/productController.js';
import { getGenres } from '../controllers/productController.js';

const router = express.Router()

// router.get('/',getProducts)
router.get('/genres',getGenres)

export default router