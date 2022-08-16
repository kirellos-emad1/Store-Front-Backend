"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_auth_1 = __importDefault(require("../Middleware/jwt_auth"));
const orders_1 = require("../Models/orders");
const order = new orders_1.orderModel();
const createOrder = async (req, res) => {
    try {
        const info = {
            status: req.body.status,
            user_id: req.body.userInfo.id,
        };
        const result = await order.create(info);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const addProduct = async (req, res) => {
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
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const userOrders = async (req, res) => {
    try {
        const result = await order.completedOrders(req.body.userInfo.id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const orderRouts = express_1.default.Router();
orderRouts.post("/", jwt_auth_1.default, createOrder);
orderRouts.post("/:id/addproduct", jwt_auth_1.default, addProduct);
orderRouts.get("/userorders", jwt_auth_1.default, userOrders);
exports.default = orderRouts;
