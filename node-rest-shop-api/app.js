const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")
const userRoutes = require("./api/routes/user")
//mongoose.connect('mongodb+srv://hicranfiliz:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-api.1rbhmku.mongodb.net/?retryWrites=true&w=majority')

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://hicran:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.qjghk80.mongodb.net/?retryWrites=true&w=majority')
mongoose.Promise = global.Promise

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE')
        return res.status(200).json({})
    }
    next()
})


//istegi islemesi gereken yollar:
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app