import dbconn from "../database";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();
const {
    BCRYPT_PASSWORD:secretPassword,
    SALT_ROUNDS:saltRounds
} = process.env;

export type User = {
     id?: number;
     name: string;
     email: string;
     password: string;
     bio?: string;
}

export class UsersManage {
  async index(): Promise<User[]> {
    try {
      
      const conn = await dbconn.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    
    const conn = await dbconn.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
      try {
    const sql = 'INSERT INTO users (fullname, email, pass_word, bio) VALUES($1, $2, $3, $4) RETURNING fullname, email';

    const conn = await dbconn.connect();
    const hashedPassword = bcrypt.hashSync(
      u.password + secretPassword, 
      Number(saltRounds)
   );
    const result = await conn.query(sql, [u.name, u.email, hashedPassword, u.bio])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.name}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'

    const conn = await dbconn.connect()

    const result = await conn.query(sql, [id])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }
}