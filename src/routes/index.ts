import { Router } from "express";
import userRouter from './api/usersRoute'
import orderRouter from './api/ordersRouter'
import productRouter from './api/productsRouter'
import otpRouter from './api/otpRouter'
import jwtRouter from './api/jwtRouter'

const routers = Router()

routers.use("/users",userRouter)
routers.use("/orders",orderRouter)
routers.use("/products",productRouter)
routers.use("/otp",otpRouter)
routers.use('/jwt', jwtRouter)

export default routers