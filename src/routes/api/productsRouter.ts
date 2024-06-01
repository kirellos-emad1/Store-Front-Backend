import { Router } from "express";
import auth from "../../Middleware/jwt_auth";
import * as productHandler from '../../Handlers/products'

const router = Router()


router.route('/create').post(auth.verifyAccessToken,productHandler.create)
router.route('/').get(productHandler.showAllProducts)
router.route('/:id').get(productHandler.showSpecificProduct)
router.route('/my-products/:id').get(productHandler.myProducts)
router.route('/update').patch(productHandler.updateProduct)
router.route('/delete/:id').delete(productHandler.deleteProduct)

export default router;