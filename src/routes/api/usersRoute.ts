import { Router } from "express";
import auth from "../../Middleware/jwt_auth";
import * as userHandler from '../../Handlers/users'

const router = Router()

router.route("/register").post(userHandler.createUser)
router.route("/register/admin").post(userHandler.createAdmin)
router.route("/login").post(userHandler.authenticate)
router.route("/get/:id").get(auth.verifyAccessToken,userHandler.getSpecificUser)
router.route("/get-all-users").get(userHandler.getAllUsers)
router.route('/delete/:id').delete(auth.verifyAccessToken, userHandler.deleteUser)
router.route("/update").patch(auth.verifyAccessToken, userHandler.updateUser)

export default router;