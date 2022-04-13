import dbconn from '../database';

export type OrderProduct = {
	id?: number;
	order_id: number;
	product_id: string;
	quantity: string;
};
export class ordersProductsManage {
	async addProduct(
		order_id: string,
		product_id: string,
		quantity: string
	): Promise<OrderProduct> {

    try {
			const connection = await dbconn.connect();
			const sql = 'SELECT * FROM orders WHERE id = ($1)';
			const resultOrder = await connection.query(sql,[order_id]);
			connection.release();
		} catch (err) {
			throw new Error(`Could not find order ${order_id}. [${err}]`);
		}
        try {
			const connection = await dbconn.connect();
			const sql = 'SELECT * FROM products WHERE id = ($1)';
			const resultProduct = await connection.query(sql,[product_id]);
			connection.release();
		} catch (err) {
			throw new Error(`Could not find product ${product_id}. [${err}]`);
		}

		try {
			const sql =
				'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [order_id, product_id, quantity]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not add product ${product_id} to order ${order_id}. [${err}]`
			);
		}
	}

	async listOrderProducts(id: string): Promise<{
		order_id: number;
		order_status: string;
		products: {
			pordust_id: number;
			product_name: string;
			product_price: number;
			quantity: number;
		};
	}> {
		try {
			const sql =
				'SELECT order_id, order_status, pordust_id, product_name, product_price, quantity FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE order_id=($1)';
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [id]);
			connection.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not find product ${id}. [${err}]`);
		}
	}

    async orderProductDelete(oid: string, pid: string): Promise<OrderProduct> {
		try {
			const connection = await dbconn.connect();
			const sql = 'DELETE FROM orders_products WHERE order_id = ($1) AND product_id = ($2)';
			const result = await connection.query(sql, [oid, pid]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete product ${pid} from order ${oid}. ${err}`);
		}
	}
}
