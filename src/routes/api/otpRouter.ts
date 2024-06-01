import { Router } from "express";
import * as otpHandler from '../../Handlers/otp'

const router = Router()


router.route("/user/verify-email").post(otpHandler.verifyEmailRoute)
router.route("/get-otp").post(otpHandler.getOtp)

export default router