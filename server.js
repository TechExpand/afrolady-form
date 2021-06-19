require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/api/subscribers', subscribersRouter)


app.listen(port, () => console.log('Server Started'))