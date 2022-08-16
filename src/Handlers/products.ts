import express,{ Request, Response } from "express";
import { Product,productModel } from "../Models/products";
import verifyAuthToken from "../Middleware/jwt_auth";

const product = new productModel();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await product.index();
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
    const result = await product.show(req.params.id);
    if (!result)
      return res.status(404).json({ error: `requested product doesn't exist` });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await product.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const productRouts: express.Router = express.Router();
    productRouts.get('/',index)
    productRouts.get('/:id',show)
    productRouts.post('/',verifyAuthToken,create)



export default productRouts