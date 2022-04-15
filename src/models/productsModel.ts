import dbconn from "../database";

export type Product = {
	id?: number;
	product_name: string;
	product_price: number;
	product_category?: string;
};

export class productsManage {
	async indexProducts(): Promise<Product[]> {
		try {
			const connection = await dbconn.connect();
			const sql = "SELECT * FROM products";
			const result = await connection.query(sql);
			connection.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get products. [${err}]`);
		}
	}

	async showProduct(id: string): Promise<Product> {
		try {
			const sql = "SELECT * FROM products WHERE id=($1)";
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [id]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. [${err}]`);
		}
	}

	async createProduct(p: Product): Promise<Product> {
		try {
			const sql =
				"INSERT INTO products (product_name, product_price, product_category) VALUES($1, $2, $3) RETURNING *";
			const connection = await dbconn.connect();
			const result = await connection.query(sql, [
				p.product_name,
				p.product_price,
				p.product_category,
			]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new product ${p.product_name}. [${err}]`);
		}
	}

	// async productInCategory(category: string): Promise<Product[]> {
	// 	try {
	// 		const connection = await dbconn.connect();
	// 		const sql = 'SELECT * FROM products WHERE product_category LIKE ($1)';
	// 		const result = await connection.query(sql, [category]);
	// 		connection.release();
	// 		return result.rows;
	// 	} catch (err) {
	// 		throw new Error(`Could not get products in categorty ${category}. [${err}]`);
	// 	}
	// }

	async productDelete(id: string): Promise<Product> {
		try {
			const connection = await dbconn.connect();
			const sql = "DELETE FROM products WHERE id = ($1)";
			const result = await connection.query(sql, [id]);
			connection.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete product ${id}. ${err}`);
		}
	}
}
