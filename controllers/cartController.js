import { getDBConnection } from "../db/db.js"
export async function addToCart(req, res) {
    const productId = parseInt(req.body.productId)
    if(isNaN(productId)) {
        return res.status(400).json({message: 'Invalid product ID'})
    }
    const userId = req.session.userId
    if(!userId) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    
    const db = await getDBConnection()
    try {
        const existingItem = await db.get('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId])
        if (existingItem) {
            await db.run('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?', [existingItem.id])
        }
        else {
            await db.run('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)', [userId, productId])
        }
        res.status(200).json({message: 'Item added to cart'})
    } catch (error) {
        res.status(500).json({message: 'Error adding item to cart', error: error.message})
    } finally {
        await db.close()
    }
}