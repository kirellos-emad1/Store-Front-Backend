import express,{ Request, Response } from "express";
import { Product,productModel } from "../Models/products";
import auth from "../Middleware/jwt_auth";

const product = new productModel();

export const showAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await product.showAllProducts();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const showSpecificProduct = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const result = await product.showSpecificProduct(req.params.id as unknown as number);
    if (!result)
      return res.status(404).json({ error: `requested product doesn't exist` });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};
export const myProducts = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const result = await product.myProducts(req.params.id as unknown as number);
    if (!result)
      return res.status(404).json({ error: `requested product doesn't exist` });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const {user_id , name, quantity , price , category, description, images} = req.body
    
    const result = await product.create({
      user_id,
      name,
      price,
      category,
      description,
      images,
      quantity
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await product.updateProduct(req.body)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json(err)
    
  }
}
export const deleteProduct =async (req:Request, res: Response): Promise<void> => {
  try {
    const result = await product.deleteProduct(req.params.id as unknown as number)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json(err)
  }
}

const productRouts: express.Router = express.Router();
    productRouts.get('/',showAllProducts)
    productRouts.get('/:id',showSpecificProduct)
    productRouts.get('/my_shop/:id',myProducts)
    productRouts.post('/create', create)
    productRouts.patch('/update',updateProduct)
    productRouts.delete('/delete/:id', deleteProduct)



export default productRouts