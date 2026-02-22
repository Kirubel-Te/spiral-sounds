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