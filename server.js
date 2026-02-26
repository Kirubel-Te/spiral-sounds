import express from 'express'
import router from './routes/products.js'
import authRouter from './routes/auth.js'
import cartRouter from './routes/cart.js'
import session from 'express-session'
import dotenv from 'dotenv'
import meRouter from './routes/me.js'

dotenv.config()
const PORT = 8000

const app = express()
const secret = process.env.SPIRAL_SESSION_SECRET

app.use(express.json())

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}))

app.use(express.static('public'))
app.use('/api/products',router)
app.use('/api/auth/me', meRouter)
app.use('/api/auth',authRouter)
app.use('/api/cart', cartRouter)




app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})