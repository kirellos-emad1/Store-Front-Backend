import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const hashPassword = (pass: string) => {
  const salt = parseInt(process.env.SALT_ROUND as string);
  return bcrypt.hashSync(`${pass}${process.env.BCRYPT_PASSWORD}`, salt);
};

export type UserRole = "ADMIN" | "USER";
export interface userInfo {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  isEmailVerified?: boolean;
}
export interface userVerified {
  email: string;
  isEmailVerified?: boolean;
}

export class userModel {
  async getAllUsers(): Promise<userInfo[]> {
    try {
      const myConn = await client.connect();
      const sql = `SELECT id, firstName, lastName, email, role, createdAt, updatedAt, isEmailVerified FROM users`;
      const result = await myConn.query(sql);
      myConn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`no user is found${err}`);
    }
  }

  async getSpecificUser(id: number): Promise<userInfo> {
    try {
      const myConn = await client.connect();
      const sql = `SELECT id, firstName, lastName, email, role, createdAt, updatedAt FROM users WHERE id=($1)`;
      const result = await myConn.query(sql, [id]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`no user found with this id ${err}`);
    }
  }

  async create(info: userInfo): Promise<userInfo> {
    try {
      const myConn = await client.connect();
      const sql = `INSERT INTO users (email, firstName, lastName, password, role, isEmailVerified) VALUES($1, $2, $3, $4, $5,$6) RETURNING id, firstName, lastName, email, role, isEmailVerified`;
      info.role = info.role || "USER";
      const result = await myConn.query(sql, [
        info.email.toLowerCase(),
        info.firstName[0].toUpperCase() + info.firstName.slice(1).toLowerCase(),
        info.lastName[0].toUpperCase() + info.lastName.slice(1).toLowerCase(),
        hashPassword(info.password),
        info.role,
        info.isEmailVerified
      ]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`can't create user ${err}`);
    }
  }
  async updateUser(info: userInfo): Promise<userInfo> {
    try {
      const myConn = await client.connect();
      const { id, firstName, lastName, email, password, role } = info;

      const updateFields = [];
      const values: (string | number | Date | undefined)[] = [id];

      if (firstName) {
        updateFields.push(`firstName=$${values.length + 1}`);
        values.push(
          firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()
        );
      }
      if (lastName) {
        updateFields.push(`lastName=$${values.length + 1}`);
        values.push(
          lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()
        );
      }
      if (email) {
        updateFields.push(`email=$${values.length + 1}`);
        values.push(email.toLowerCase());
      }
      if (password) {
        updateFields.push(`password=$${values.length + 1}`);
        values.push(hashPassword(password));
      }
      if (role) {
        updateFields.push(`role=$${values.length + 1}`);
        values.push(role);
      }

      if (updateFields.length === 0) {
        throw new Error("No fields to update specified.");
      }

      updateFields.push(`updatedAt=$${values.length + 1}`);
      values.push(new Date());

      const sql = `UPDATE users SET ${updateFields.join(
        ", "
      )} WHERE id=$1 RETURNING id, firstName, lastName, email, password, role, createdAt, updatedAt`;

      const result = await myConn.query(sql, values);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to update user: ${err}`);
    }
  }

  async userVerified(info: userVerified): Promise<userVerified> {
    try {
      const myConn = await client.connect();
      const { email, isEmailVerified } = info;

      const sql = `UPDATE users SET isEmailVerified=$2 WHERE email=$1 RETURNING id, firstName, lastName, email, password, role, createdAt, updatedAt, isEmailVerified`;

      const result = await myConn.query(sql, [email, isEmailVerified]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to verify user: ${err}`);
    }
  }
  async deleteUser(id: number): Promise<userInfo> {
    try {
      const myConn = await client.connect();
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id, firstName, lastName, email, role`;
      const result = await myConn.query(sql, [id]);
      myConn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to delete user: ${err}`);
    }
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<userInfo | null> {
    try {
      const myConn = await client.connect();
      const sql = `SELECT password FROM users WHERE email=$1`;
      const result = await myConn.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${process.env.BCRYPT_PASSWORD}`,
          hashPassword
        );
        if (isPasswordValid) {
          const sql = `SELECT email, firstName, lastName, id, role,isEmailVerified  FROM users WHERE email=($1)`;
          const userInfo = await myConn.query(sql, [email]);
          myConn.release();
          return userInfo.rows[0];
        }
      }
      throw new Error(`password don't match`)
    } catch (err) {
      throw new Error(`Unable to authenticate user ${err}`);
    }
  }
}
