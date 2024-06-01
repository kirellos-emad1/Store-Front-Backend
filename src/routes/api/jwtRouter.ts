import { Router } from "express";
import auth from "../../Middleware/jwt_auth";


const router =  Router()

router.route("/refresh-tokens").post(auth.refreshTokens)
export default router