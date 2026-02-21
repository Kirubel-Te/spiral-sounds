import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path'

async function createTable(){
    const db = await open({
        filename: path.join('database.db'),
        driver:sqlite3.Database
    })
    await db.exec(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        genre TEXT NOT NULL,
        year INTEGER NOT NULL,
        stock INTEGER NOT NULL)`)

    await db.close()
    console.log('Table created successfully')
}

createTable()