"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../Models/products");
const jwt_auth_1 = __importDefault(require("../Middleware/jwt_auth"));
const product = new products_1.productModel();
const index = async (_req, res) => {
    try {
        const result = await product.index();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const show = async (req, res) => {
    try {
        const result = await product.show(req.params.id);
        if (!result)
            return res.status(404).json({ error: `requested product doesn't exist` });
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const create = async (req, res) => {
    try {
        const result = await product.create(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const productRouts = express_1.default.Router();
productRouts.get('/', index);
productRouts.get('/:id', show);
productRouts.post('/', jwt_auth_1.default, create);
exports.default = productRouts;
