import dbconn from '../database'

export type Order = {
	id?: number
	status: string
	user_id: number
}

export class ordersManage {
	// show all orders
	async indexOrders(): Promise<Order[]> {
		try {
			const connection = await dbconn.connect()
			const sql = 'SELECT * FROM orders'

			const result = await connection.query(sql)

			connection.release()

			return result.rows
		} catch (err) {
			throw new Error(`Could not get orders. [${err}]`)
		}
	}

	// show only active order for user
	async showCompleted(uid: string): Promise<Order> {
		try {
			const sql = "SELECT * FROM orders WHERE user_id=($1) AND status LIKE 'complete'"

			const connection = await dbconn.connect()

			const result = await connection.query(sql, [uid])

			connection.release()

			return result.rows
		} catch (err) {
			throw new Error(`Could not find active order for user ${uid}. [${err}]`)
		}
	}

	// create new order for user
	async createOrder(o: Order): Promise<Order> {
		try {
			const sql = 'INSERT INTO orders (order_status, user_id) VALUES($1, $2) RETURNING *'

			const connection = await dbconn.connect()

			const result = await connection.query(sql, [o.status, o.user_id])

			connection.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not add new order for user ${o.user_id}. [${err}]`)
		}
	}
}
