import client from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity:number;
  category: string;
  description: string;
  images:string[]
  user_id?:number;
}

export class productModel {
  async showAllProducts(): Promise<Product[]> {
    try {
      const myConn = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await myConn.query(sql);
      myConn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`There no products found ${err}`);
    }
  }
  async myProducts(user_id: number): Promise<Product> {
    try {
      const myConn = await client.connect()
      const sql = `SELECT * FROM products WHERE user_id=($1)`
      const result = await myConn.query(sql, [user_id])
      myConn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Can't get this product ${err}`)
    }
  }

  async showSpecificProduct(id: number): Promise<Product> {
    try {
      const myConn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const result = await myConn.query(sql, [id]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`There is no products for this id ${err}`);
    }
  }

  async create(product:Product): Promise<Product> {
    try {
      const myConn = await client.connect();
      const sql1 = `SELECT role FROM users WHERE id=($1)`
      const result1 =  await myConn.query(sql1,[product.user_id])
      console.log(result1.rows[0].role)
      if(result1.rows[0].role === 'ADMIN'){
      const sql = `INSERT INTO products (name, price, category, quantity, description, images, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const result = await myConn.query(sql, [
        product.name,
        product.price,
        product.category,
        product.quantity,
        product.description,
        product.images,
        product.user_id
      ]);
      result.rows[0]
      myConn.release();
      return result.rows[0];
    }else{
      throw new Error('Must to ba admin to create user')
    }
    } catch (err) {
      throw new Error(`Can't create the product ${err}`);
    }
  }

  async deleteProduct(id:number): Promise<Product> {
    try {
      const myConn =  await client.connect()
      const sql = `DELETE FROM products WHERE id=($1) RETURNING name, price, category, quantity, description, images`
      const result =  await myConn.query(sql, [id])
      myConn.release()
      return result.rows[0]
      
    } catch (err) {
      throw new Error (`Unable to delete this product ${err}`)
    }
  }

  async updateProduct(product: Product): Promise<Product>{
    try {
      const myConn = await client.connect()
      const sql = `UPDATE products SET name=$1,price=$2,category=$3,quantity=$4,description=$5,images=$6 WHERE id=$7 RETURNING name, price, category, id, quantity, description ,images`
      const result = await myConn.query(sql, [
        product.name,
        product.price,
        product.category,
        product.quantity,
        product.description,
        product.images,
        product.id
      ])
      myConn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Can't update`)
    }
  }

}
