"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../Models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_auth_1 = __importDefault(require("../Middleware/jwt_auth"));
dotenv_1.default.config();
const user = new users_1.userModel();
const index = async (_req, res) => {
    try {
        const result = await user.index();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const show = async (req, res) => {
    try {
        const result = await user.show(req.params.id);
        if (!result)
            return res.status(404).json({ error: `requested user doesn't exist` });
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const create = async (req, res) => {
    try {
        const hashpwd = await bcrypt_1.default.hash(`${req.body.password}${process.env.PEPPER}`, 10);
        const info = {
            hashpwd,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        };
        const result = await user.create(info);
        const token = jsonwebtoken_1.default.sign(result, process.env.TOKEN_SECRET);
        res.status(200).json({ token, result });
    }
    catch (err) {
        res.status(400).json(`${err}`);
    }
};
const usersRouts = express_1.default.Router();
usersRouts.get("/", jwt_auth_1.default, index);
usersRouts.get("/:id", jwt_auth_1.default, show);
usersRouts.post("/", create);
exports.default = usersRouts;
