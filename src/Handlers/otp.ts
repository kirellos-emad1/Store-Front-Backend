import { Request, Response } from "express";
import client from "../database";
import { generateAndSendOTP, verifyEmail } from "../Middleware/otpMiddleware";

const checkIfEmailVerified = async (email: string): Promise<boolean> => {
    const myConn = await client.connect();
    try {
        const sql = `SELECT isEmailVerified FROM users WHERE email = $1`;
        const result = await myConn.query(sql, [email]);
        return result.rows[0].isemailverified !== false;
    } finally {
        myConn.release();
    }
};

export const getOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const isVerified = await checkIfEmailVerified(email);

        if (isVerified) {
            res.status(400).json({
                error: `Email ${email} is already verified.`,
            });
        } else {
            await generateAndSendOTP(req, res, async () => {
                res.status(200).json("OTP is Ready");
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const verifyEmailRoute = async (req: Request, res: Response): Promise<void> => {
    try {
        await verifyEmail(req, res, async () => {
            // The verification logic is handled in the middleware, no additional action needed here.
            // You can add any additional response if required.
            // res.json({
            //   status: 200,
            //   message: "Email successfully verified",
            // });
            // Note: The response is already handled in the middleware to update the user in the database.
        });
    } catch (err) {
        res.status(400).json(`${err}`);
    }
};
