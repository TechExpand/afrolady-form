const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const subscribersRouter = require('./routes/subscribers')
app.use('/api/subscribers', subscribersRouter)



app.listen(port, () => console.log('Server Started'))
