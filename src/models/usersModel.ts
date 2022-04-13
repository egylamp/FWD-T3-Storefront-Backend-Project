import dbconn from '../database'
import bcrypt from 'bcrypt'

import dotenv from 'dotenv'
dotenv.config()
const { BCRYPT_PASSWORD: secretPassword, SALT_ROUNDS: saltRounds } = process.env

export type User = {
	id?: number
	firstname?: string
	lastname?: string
	username: string
	password: string
}

export class usersManage {
	async indexUsers(): Promise<User[]> {
		try {
			const connection = await dbconn.connect()
			const sql = 'SELECT id, firstname, lastname FROM users'

			const result = await connection.query(sql)

			connection.release()

			return result.rows
		} catch (err) {
			throw new Error(`Could not find users. Error: ${err}`)
		}
	}

	async showUser(id: string): Promise<User> {
		try {
			const sql = 'SELECT id, firstname, lastname FROM users WHERE id=($1)'

			const connection = await dbconn.connect()

			const result = await connection.query(sql, [id])

			connection.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not find user ${id}. [${err}]`)
		}
	}

	async createUser(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname'

			const connection = await dbconn.connect()
			const hashedPassword = bcrypt.hashSync(
				u.password + secretPassword,
				Number(saltRounds)
			)
			const result = await connection.query(sql, [
				u.firstname,
				u.lastname,
				u.username,
				hashedPassword,
			])

			connection.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not add new user ${u.firstname}. [${err}]`)
		}
	}

	async userLogin(username: string, password: string): Promise<User> {
		try {
			const sql =
				'SELECT id, firstname, lastname FROM users WHERE username LIKE ($1) AND password LIKE ($2)'

			const connection = await dbconn.connect()

			const result = await connection.query(sql, [username, password])

			connection.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not find user ${username}. [${err}]`)
		}
	}
}
