import client from "../database";

export interface userInfo {
    id ? : number;
    email: string;
    firstName: string;
    lastName: string;
    hashpwd?: string;
}


export class userModel {
    async index(): Promise < userInfo[] > {
        try {
            const myConn = await client.connect();
            const sql = `SELECT id, firstName, lastName, email FROM users`;
            const result = await myConn.query(sql);
            myConn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`no user is found${err}`);
        }
    }

    async show(id: number): Promise < userInfo > {
        try {
            const myConn = await client.connect();
            const sql = `SELECT id, firstName, lastName, email FROM users WHERE id=($1)`;
            const result = await myConn.query(sql, [id]);
            myConn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`no user found with this id ${err}`)
        }

    }

    async create(info: userInfo): Promise < userInfo > {
        try {
            const myConn = await client.connect();
            const sql = `INSERT INTO users (email, firstName, lastName, hashpwd) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email`;
            const result = await myConn.query(sql, [
                info.email,
                info.firstName,
                info.lastName,
                info.hashpwd,
            ]);
            myConn.release();
            return result.rows[0];
        } catch (err) {
            console.log(err)
            throw new Error(`can't create user ${err}`);
        }
    }
}