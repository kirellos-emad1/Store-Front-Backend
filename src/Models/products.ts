import client from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class productModel {
  async index(): Promise<Product[]> {
    try {
      const myConn = await client.connect()
    const sql = `SELECT * FROM products`;
    const result = await myConn.query(sql);
    myConn.release()
    return result.rows;
    } catch (err) {
      throw new Error(`There no products found ${err}`);
      
    }
    
  }

  async show(id: string): Promise<Product> {
    try {
      const myConn = await client.connect()
    const sql = `SELECT * FROM products WHERE id=($1)`;
    const result = await myConn.query(sql, [id]);
    myConn.release()
    return result.rows[0];
    } catch (err) {
      throw new Error(`There is no products for this id ${err}`);
      
    }
    
  }

  async create(product: Product): Promise<Product> {
    try {
      const myConn = await client.connect()
    const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`;
    const result = await myConn.query(sql, [product.name, product.price]);
    myConn.release()
    return result.rows[0];
    } catch (err) {
      throw new Error(`Can't create product ${err}`);
      
    }
    
  }
}