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
        let query = 'SELECT * FROM products'

        const products = await db.all(query)
        await db.close()
        res.json(products)

    }catch(error){
        console.error('Error fetching products:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}