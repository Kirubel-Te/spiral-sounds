import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path'
import { log } from 'node:console';


export async function logTable(){
    const db = await open({
        filename: path.join('database.db'),
        driver:sqlite3.Database
    })

    const products = await db.all('SELECT * FROM products')
    console.table(products)
    const users = await db.all('SELECT * FROM users')
    console.table(users)

    await db.close()
}

logTable()