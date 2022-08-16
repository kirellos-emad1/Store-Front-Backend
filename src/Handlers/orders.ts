import express, { Request, Response } from "express";
import verifyAuthToken  from "../Middleware/jwt_auth";
import { orderModel } from "../Models/orders";

const order = new orderModel();

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const info = {
      status: req.body.status,
      user_id: req.body.userInfo.id,
    };
    const result = await order.create(info);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const addProduct = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const isOrdered = await order.show(req.params.id);
    if (!isOrdered)
      return res
        .status(404)
        .json({ error: `order doesn't exist, can't add product` });
    if (isOrdered.status !== "active") {
      return res
        .status(400)
        .json("Order is not active,product could not be added to order");
    }
    const result = await order.addProductToOrder({
      ...req.body,
      order_id: req.params.id,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const userOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await order.completedOrders(req.body.userInfo.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const orderRouts: express.Router = express.Router();

orderRouts.post("/",verifyAuthToken,createOrder)
orderRouts.post("/:id/addproduct",verifyAuthToken,addProduct)
orderRouts.get("/userorders", verifyAuthToken,userOrders)


export default orderRouts