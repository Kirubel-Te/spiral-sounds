import { getDBConnection } from "../db/db.js"

export async function getGenres(req, res) {
    try{
        const db = await getDBConnection()
        const genres = await db.all('SELECT DISTINCT genre FROM products')
        await db.close()
        res.json(genres.map(g => g.genre))
    }catch(error){
        console.error('Error fetching genres:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getProducts(req, res) {
    try{
        const db = await getDBConnection()
        if(req.query.genre){
            const genre = req.query.genre
            let query = 'SELECT * FROM products WHERE genre = ?'
            const param = [genre]
            const products = await db.all(query, param)
            await db.close()
            return res.json(products)
        }else if(req.query.search){
            const search = `%${req.query.search}%`
            let query = 'SELECT * FROM products WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
            const param = [search, search, search]
            const products = await db.all(query, param)
            await db.close()
            return res.json(products)
        }
        else{
            const products = await db.all('SELECT * FROM products')
            await db.close()
            return res.json(products)
        }
        

    }catch(error){
        console.error('Error fetching products:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}