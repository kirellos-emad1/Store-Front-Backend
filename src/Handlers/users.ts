import express, { Request, Response } from "express";
import { userModel } from "../Models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../Middleware/jwt_auth";
dotenv.config();

const user = new userModel();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await user.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const show = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const result = await user.show(req.params.id as unknown as number);
    if (!result)
      return res.status(404).json({ error: `requested user doesn't exist` });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashpwd = await bcrypt.hash(
      `${req.body.password}${process.env.PEPPER}`,
      10
    );
    const info = {
      hashpwd,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const result = await user.create(info);
    const token = jwt.sign(result, process.env.TOKEN_SECRET as string);
    res.status(200).json({ token, result });
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const usersRouts: express.Router = express.Router();

usersRouts.get("/", verifyAuthToken, index);
usersRouts.get("/:id", verifyAuthToken,show);
usersRouts.post("/", create);

export default usersRouts;