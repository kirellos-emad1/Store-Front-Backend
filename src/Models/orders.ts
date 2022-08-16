import client from "../database";

export interface order {
  id ? : number;
  status: string;
  user_id: number;
}

export interface orderProduct {
  id ? : number;
  quantity: number;
  order_id: number;
  product_id: number;
}

export interface userOrder {
  user_id: number;
  order_id: number;
  status: string;
  quantity: number;
  name: string;
  price: number;
  product_id: number;
}

export class orderModel {
  async create(order: order): Promise < order > {
    try {
      const myConn = await client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *`;
      const result = await myConn.query(sql, [order.status, order.user_id]);
      myConn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't create order :Error ${error}`)
    }
  }

  async show(id: string): Promise < order > {
    try {
      const myConn = await client.connect()
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await myConn.query(sql, [id]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`No orders to view ${err}`)
    }
  }

  async addProductToOrder(product: orderProduct): Promise < orderProduct > {
    try {
      const myConn = await client.connect()
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;
      const result = await myConn.query(sql, [
        product.quantity,
        product.order_id,
        product.product_id,
      ]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't add product to order${err}`)
    }
  }
  async completedOrders(id: number): Promise < userOrder[] > {
    try {
      const myConn = await client.connect()
      const sql = `select orders.user_id, orders.id as order_id, orders.status, order_products.quantity, products.name, products.price, products.id as product_id
    from orders
    join order_products on orders.id = order_products.order_id
    join products on order_products.product_id = products.id
    where user_id = $1`;
      const result = await myConn.query(sql, [id]);
      myConn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`There is no completed order${err}`)
    }
  }
}