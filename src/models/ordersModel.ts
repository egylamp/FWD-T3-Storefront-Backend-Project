import dbconn from "../database";

export type Order = {
	id?: number;
	order_status: string;
	user_id: number;
};

export class ordersManage {
	// show all orders
	async indexOrders(): Promise<Order[]> {
		try {
			const connection = await dbconn.connect();
			const sql = "SELECT * FROM orders";
			const result = await connection.query(sql);
			connection.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get orders. [${err}]`);
		}
	}

	async showOrders(uid: string): Promise<Order[]> {
		try {
			const sql = "SELECT * FROM orders WHERE user_id=($1)";
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [uid]);
			connection.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not find orders for user ${uid}. [${err}]`);
		}
	}

	// show only active order for user
	async showCompleted(uid: string): Promise<Order[]> {
		try {
			const sql =
				"SELECT * FROM orders WHERE user_id=($1) AND order_status LIKE 'complete'";
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [uid]);
			connection.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not find completed order for user ${uid}`);
		}
	}

	// create new order for user
	async createOrder(o: Order): Promise<Order> {
		try {
			const sql =
				"INSERT INTO orders (order_status, user_id) VALUES($1, $2) RETURNING id, user_id, order_status";
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [o.order_status, o.user_id]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new order for user ${o.user_id}. [${err}]`);
		}
	}

	async orderUpdateStatus(id: string, status: string): Promise<Order> {
		try {
			const connection = await dbconn.connect();
			const sql = "UPDATE orders SET ($1) WHERE id = ($2)";
			const result = await connection.query(sql, [status, id]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update the status of order ${id}. ${err}`);
		}
	}

	async orderDelete(id: string): Promise<Order> {
		try {
			const connection = await dbconn.connect();
			const sql = "DELETE FROM orders WHERE id = ($1)";
			const result = await connection.query(sql, [id]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete order ${id}. ${err}`);
		}
	}
}
