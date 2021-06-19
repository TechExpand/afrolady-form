require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/api/subscribers', subscribersRouter)

app.listen(9000, () => console.log('Server Started'))