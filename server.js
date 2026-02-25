import express from 'express'
import router from './routes/products.js'
import authRouter from './routes/auth.js'
import session from 'express-session'
const PORT = 8000

const app = express()
const secret = process.env.SPIRAL_SESSION_SECRET || 'jellyfish-baskingshark'

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
app.use('/api/auth',authRouter)




app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})