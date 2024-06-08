import express from 'express'
import customerRouter from './modules/customers/customers.routers.js'
import carRouter from './modules/Cars/cars.routers.js'
import rentalRouter from './modules/rentals/rentals.routers.js'

import errorHandler from './utils/errorHandler.utils.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/customer',customerRouter)
app.use('/car',carRouter)
app.use('/rentals',rentalRouter)


app.all('*', (req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
})

app.use(errorHandler)

app.listen(port, () => console.log(`app listening on port ${port}`))