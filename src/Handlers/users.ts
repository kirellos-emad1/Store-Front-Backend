import express, { Request, Response } from "express";
import { userModel } from "../Models/users";
import dotenv from "dotenv";
import client from "../database";
import auth from "../Middleware/jwt_auth";
import { UserRole } from "../Models/users";
dotenv.config();

const user = new userModel();
const create = async (
  req: Request,
  res: Response,
  role: UserRole,
  isEmailVerified: boolean
): Promise<void> => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!firstName || firstName.length < 3) {
      throw new Error(`First name should be at least 3 character long`);
    }
    if (!lastName || lastName.length < 3) {
      throw new Error(`First name should be at least 3 character long`);
    }
    if (!password || password.length < 8) {
      throw new Error(
        `Password Not valid please enter password with 8 character long`
      );
    }
    const myConn = await client.connect();
    const emailCheckQuery = `SELECT id FROM users WHERE email = $1`;
    const existingUser = await myConn.query(emailCheckQuery, [
      email.toLowerCase(),
    ]);

    if (existingUser.rows.length > 0) {
      myConn.release();
      throw new Error(
        `Email ${email} is already in use. Please choose another email or log in.`
      );
    }

    const result = await user.create({
      email,
      firstName,
      lastName,
      password,
      role,
      isEmailVerified,
    });
    const tokens = auth.issueTokens(result);
    res.cookie("REFRESH-TOKEN", tokens.refreshToken, { httpOnly: true });
    res.cookie("ACCESS-TOKEN", tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
    res.json({
      status: 200,
      userData: result,
      tokens: tokens,
      message: "User has been created successfully",
    });
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  await create(req, res, "USER", false);
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  await create(req, res, "ADMIN", true);
};
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await user.getAllUsers();
    res.json({
      status: 200,
      data: result,
      message: "Here it is all users data",
    });
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const getSpecificUser = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const result = await user.getSpecificUser(
      req.params.id as unknown as number
    );
    if (!result)
      return res.status(404).json({ error: `requested user doesn't exist` });
    res.json({
      status: 200,
      data: result,
    });
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password, role, updatedAt } = req.body;
    const id = req.params.id as unknown as number;
    const result = await user.updateUser({
      id,
      email,
      firstName,
      lastName,
      password,
      role,
      updatedAt,
    });

    res.json({
      status: 200,
      data: result,
      message: "User has been updated just now",
    });
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await user.deleteUser(req.params.id as unknown as number);
    res.json({
      status: 200,
      data: result,
      message: "The user has been DELETED successfully",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await user.authenticate(email, password);
    const tokens = auth.issueTokens(userData);
    if (!userData) {
      return res.status(400).json("the email and password do not match");
    }
    res.cookie("REFRESH-TOKEN", tokens.refreshToken, { httpOnly: true });
    res.cookie("ACCESS-TOKEN", tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
    res.status(200).json({ userData, tokens });
  } catch (err) {
    res.status(400).json(err);
  }
};


const usersRouts: express.Router = express.Router();

usersRouts.post("/register", createUser);
usersRouts.post("/register/admin", createAdmin);
usersRouts.post("/login", authenticate);
// usersRouts.post("/verify-email", verifyEmailRoute);
// usersRouts.post("/get-otp", getOtp);
usersRouts.get("/", getAllUsers);
usersRouts.patch("/my-profile/update/:id", updateUser);
usersRouts.get("/:id", auth.verifyAccessToken, getSpecificUser);
usersRouts.delete("/delete/:id", deleteUser);

export default usersRouts;
