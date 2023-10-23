import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAuthToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json("Not Authorized");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err, decoded): Response | undefined => {
        if (err) return res.status(403).json("invalid token");
        req.body.userInfo = decoded;
        next();
      }
    );
  };
export default verifyAuthToken