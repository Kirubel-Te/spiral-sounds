import express from 'express'
import router from './routes/products.js'
const PORT = 8000

const app = express()

app.use(express.static('public'))
app.use('/api/products',router) 


app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})