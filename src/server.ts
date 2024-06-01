import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
// import orderRoutes from './Handlers/orders';
// import productRoutes from './Handlers/products';
// import usersRoutes from './Handlers/users';
import routers from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: express.Application = express();
const port = 5000;
const address: string = "http://localhost:5000";

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
// app.use("/users", usersRoutes);
// app.use("/orders", orderRoutes);
// app.use("/products", productRoutes);
app.use('/api', routers)

app.get('/', function (req: Request, res: Response) {
    res.send('<h1>Hello World!<h1>');
});

app.listen(port, function () {
    console.log(`Starting app on: ${address}`);
});

export default app;
