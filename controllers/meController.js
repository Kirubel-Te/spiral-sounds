import { getDBConnection } from "../db/db.js";

export async function getCurrentUser(req,res){
    if(!req.session.userId){
        return res.json({isLoggedIn: false})
    }else{
        try{
            const db = await getDBConnection()
            const user = await db.get('SELECT name FROM users WHERE id = ?', [req.session.userId])
            await db.close()
            return res.json({isLoggedIn: true, name: user.name})
        }catch(err){
            console.log(err)
            return res.json({isLoggedIn: false})
        }
    }
}