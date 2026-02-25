import validator from 'validator'
import { getDBConnection } from '../db/db.js'
import bcrypt from 'bcryptjs'

export async function registerUser(req,res){
    let {name,email, username, password} = req.body
    

    if(!name || !email || !username || !password){
        return res.status(400).json({error: 'All fields are required'})
    }
    name = name.trim()
    email = email.trim()
    username = username.trim()
    password = password.trim()

    const regex = /^[a-zA-Z0-9_-]{1,20}$/
    if (!regex.test(username)) {
        return res.status(400).json({error: 'Username is invalid'})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error: 'Email is invalid'})
    }

    try{
        const db = await getDBConnection()
        const existingUser = await db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email])
        if(existingUser){
            await db.close()
            return res.status(400).json({error: 'Username or email already exists'})
        }else{
            const hashedPassword = await bcrypt.hash(password, 12)
            const result = await db.run('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, hashedPassword])
            req.session.userId = result.lastID
            await db.close()
            return res.status(201).json({message: 'User registered successfully', userId: result.lastID})
        }

    }catch(error){
        console.error('Error registering user:', error)
        res.status(500).json({error: 'Registration failed. Please try again.'})
    }

    
}

export async function loginUser(req,res){
    let {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({error: 'Username and password are required'})
    }
    username = username.trim()
    password = password.trim()
    try{
        const db = await getDBConnection()
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username])
        await db.close()
        if(!user){
            return res.status(400).json({error: 'Invalid username or password'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({error: 'Invalid username or password'})
        }
        req.session.userId = user.id
        return res.json({message: 'Login successful', userId: user.id})
    }catch(error){
        console.error('Error logging in user:', error)
        return res.status(500).json({error: 'Login failed. Please try again.'})
    }
}

export async function logoutUser(req,res){
    req.session.destroy(err => {
        if(err){
            console.error('Error logging out user:', err)
            return res.status(500).json({error: 'Logout failed. Please try again.'})
        }
        res.clearCookie('connect.sid')
        return res.json({message: 'Logout successful'})
    })
}