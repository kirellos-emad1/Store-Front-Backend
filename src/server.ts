import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import orderRouts from './Handlers/orders'
import productRouts from './Handlers/products'
import usersRouts from './Handlers/users'

const app: express.Application = express()
const port = 5000
const address: string = "http://localhost:5000"

app.use(bodyParser.json())

app.use("/users", usersRouts)
app.use("/orders", orderRouts)
app.use("/products", productRouts)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})



app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})

export default app
