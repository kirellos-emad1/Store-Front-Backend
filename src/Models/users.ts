import client from "../database";

export interface userInfo {
    id ? : number;
    firstname: string;
    lastname: string;
    hashpwd?: string;
}


export class userModel {
    async index(): Promise < userInfo[] > {
        try {
            const myConn = await client.connect();
            const sql = `SELECT id, firstName, lastName FROM users`;
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
            const sql = `SELECT id, firstName, lastName FROM users WHERE id=($1)`;
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
            const sql = `INSERT INTO users (firstName, lastName, hashpwd) VALUES($1, $2, $3) RETURNING id, firstName, lastName`;
            const result = await myConn.query(sql, [
                info.firstname,
                info.lastname,
                info.hashpwd,
            ]);
            myConn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't create user ${err}`);
        }
    }
}