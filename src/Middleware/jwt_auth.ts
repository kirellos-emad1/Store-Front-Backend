import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const issueTokens = (user: any) => {
  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET as string
  );
  return { accessToken, refreshToken };
};

const verifyAccessToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json("Not Authorized");
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded): Response | undefined => {
        if (err) return res.status(403).json("Invalid token");
        req.body.userInfo = decoded;
        next();
      }
    );
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
};

const verifyRefreshToken = (req: Request, res: Response, next: any) => {
  const refreshToken = req.cookies.REFRESH_TOKEN;
  if (!refreshToken) {
    return res.status(403).json("Refresh token not provided");
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;
    req.body.userInfo = decoded;
    next();
  } catch (error) {
    return res.status(403).json("Invalid refresh token");
  }
};

const refreshTokens = async (req: Request, res: Response) => {
  const {refreshToken} = req.body

  if (!refreshToken) {
    return res.status(401).json("Invalid token");
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;
    const user = {
      firstName: decodedToken.firstname,
      lastName: decodedToken.lastname,
      email: decodedToken.email,
      id: decodedToken.id,
      role: decodedToken.role,
    };

    const tokens = issueTokens(user);
    res.cookie("REFRESH-TOKEN", tokens.refreshToken, { httpOnly: true });
    res.cookie("ACCESS-TOKEN", tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
    res.json(tokens);
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
};

export default {
  verifyAccessToken,
  refreshTokens,
  issueTokens,
  verifyRefreshToken,
};
