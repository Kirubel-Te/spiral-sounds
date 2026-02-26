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
export async function cartCount(req, res){
    const userId = req.session.userId
    if(!userId) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    const db = await getDBConnection()
    try{
        const count = await db.get('SELECT SUM(quantity) as count FROM cart_items WHERE user_id = ?', [userId])
        res.json({totalItems: count.count || 0})
    }catch(error){
        res.status(500).json({message: 'Error fetching cart count', error: error.message})
    } finally {
        await db.close()
    }
}

export async function getAll(req, res){
    const userId = req.session.userId
    if(!userId) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    const db = await getDBConnection()
    try{
        const items = await db.all(`
            SELECT ci.id AS cartItemId, ci.quantity, p.title, p.artist, p.price 
            FROM cart_items ci 
            JOIN products p ON ci.product_id = p.id 
            WHERE ci.user_id = ?`, [userId])
        res.json({items})
    } catch(error){
        res.status(500).json({message: 'Error fetching cart items', error: error.message})
    } finally {
        await db.close()
    }
}

export async function deleteItem(req, res){
    const cartItemId = parseInt(req.params.itemId, 10)
    if(isNaN(cartItemId)) {
        return res.status(400).json({message: 'Invalid cart item ID'})
    }
    const userId = req.session.userId
    if(!userId) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    const db = await getDBConnection()
    try{
        const item = await db.get('SELECT * FROM cart_items WHERE id = ? AND user_id = ?', [cartItemId, userId])
        if(!item) {
            return res.status(404).json({message: 'Cart item not found'})
        }else{
            await db.run('DELETE FROM cart_items WHERE id = ?', [cartItemId])
            res.status(204).send()
        }
    }catch(error){
        res.status(500).json({message: 'Error deleting cart item', error: error.message})
    } finally {
        await db.close()
    }
}

export async function deleteAll(req, res){
    const userId = req.session.userId
    if(!userId) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    const db = await getDBConnection()
    try{
        await db.run('DELETE FROM cart_items WHERE user_id = ?', [userId])
        res.status(204).send()
    }catch(error){
        res.status(500).json({message: 'Error deleting cart items', error: error.message})
    } finally {
        await db.close()
    }
}