import { Request as ExpressRequest, Response, NextFunction } from "express";
import { userModel } from "../Models/users";
import { addSeconds, isBefore } from "date-fns";
import Brevo from "@getbrevo/brevo";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

// let apiInstance = new Brevo.TransactionalEmailsApi()

// let apiKey = apiInstance.authentications['apiKey'];
// apiKey.apiKey = `${process.env.BREVO_API}`;

const hashOTP = (otp: number) => {
  const salt = parseInt(process.env.SALT_ROUND as string);
  return bcrypt.hashSync(`${otp}${process.env.BCRYPT_OTP}`, salt);
};

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "cc512739cd37a6",
    pass: "5a3369794e2144",
  },
});

const user = new userModel();

interface CustomRequest extends ExpressRequest {
  user?: {
    email: string;
    otp: number;
    otpExpiresAt: Date;
  };
}

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const otpDataFilePath = path.join(process.cwd(), "otp.json");

export const generateAndSendOTP = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Check if OTP data already exists for the user
    const existingData = await readFileAsync(otpDataFilePath, "utf-8");
    const parsedData = existingData ? JSON.parse(existingData) : [];
    const userOtpIndex = parsedData.findIndex(
      (data: any) => data.email === email
    );

    if (userOtpIndex !== -1) {
      // If OTP data exists for the user, delete the old one
      parsedData.splice(userOtpIndex, 1);
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiresAt = addSeconds(new Date(), 300);

    const otpData = {
      email,
      otpExpiresAt,
      otp: hashOTP(otp),
    };

    // Add new OTP data
    parsedData.push(otpData);

    // Write updated data to the file
    await writeFileAsync(
      otpDataFilePath,
      JSON.stringify(parsedData, null, 2),
      "utf-8"
    );

    // Send the new OTP via email
    const mailOptions = {
      from: "kirellosemad43@gmail.com",
      to: email,
      subject: "OTP for Email Verification",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    next();
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};

export const verifyEmail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;

    // Read OTP data from the file
    const existingData = await readFileAsync(otpDataFilePath, "utf-8");
    const parsedData = existingData ? JSON.parse(existingData) : [];

    const userDataIndex = parsedData.findIndex(
      (data: any) => data.email === email
    );

    if (userDataIndex !== -1) {
      const userData = parsedData[userDataIndex];

      if (
        bcrypt.compareSync(`${otp}${process.env.BCRYPT_OTP}`, userData.otp) &&
        isBefore(new Date(), new Date(userData.otpExpiresAt))
      ) {
        const result = await user.userVerified({
          email,
          isEmailVerified: true,
        });
        parsedData.splice(userDataIndex, 1);
        await writeFileAsync(
          otpDataFilePath,
          JSON.stringify(parsedData, null, 2),
          "utf-8"
        );

        res.json({
          status: 200,
          message: "Email successfully verified",
          userData: result,
        });
        next();
      } else if (parseInt(otp) !== userData.otp) {
        res.status(401).json({ error: "Invalid OTP: OTP Don't Match" });
      } else if (
        isBefore(new Date(), new Date(userData.otpExpiresAt)) === false
      ) {
        res.status(401).json({ error: "Invalid OTP: OTP Timed Out" });
      } else {
        res.status(401).json({ error: "Invalid OTP" });
      }
    } else {
      res.status(404).json({ error: "Email not found" });
    }
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};
