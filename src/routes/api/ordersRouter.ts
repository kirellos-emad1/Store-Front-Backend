import { Router } from "express";
import auth from "../../Middleware/jwt_auth";
import * as orderHandler from '../../Handlers/orders'

const router = Router()


router.route("/").post(orderHandler.createOrder)
router.route("/my-cart/:id").post(orderHandler.addProduct)
router.route("/my-orders").get( orderHandler.userOrders)

export default router