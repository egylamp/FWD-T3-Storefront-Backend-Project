import supertest from "supertest";
import app from "../server";
//  create a request object
const request = supertest(app);
let token;
describe("Test products routes endpoints", () => {
	beforeAll(async () => {
		const response = await request.post("/users/login").send({
			"username": "abdelkawy",
			"password": "password123"
		});
		token = response.body;
	});

	it("Index products endpoint return products list", async () => {
		const response = await request.get("/products");
		expect(response.body).toEqual([
			{
				id: 1,
			    product_name: 'Porodo mechanical keyboard',
			    product_price: 17,
			    product_category: 'Computer Parts'
			}
		]);
	});

    it("Show product endpoint return the specific product", async () => {
		const response = await request.get("/products/1");
		expect(response.body).toEqual(
			{
				id: 1,
			    product_name: 'Porodo mechanical keyboard',
			    product_price: 17,
			    product_category: 'Computer Parts'
			}
		);
	});

	it("Create product endpoint to return specific error without token", async () => {
		const response = await request.post("/products");
		expect(response.body).toBe("Access denied, invalid token");
	});

	it("Create product endpoint retrun the created product", async () => {
		const response = await request.post("/products").send({
			"product_name": "Logitech MX mouse",
			"product_price": 20,
			"product_category": "Computer Parts"
		}).set("authorization", 'Bearer '+token);
		//expect(response.status).toBe(200);
		expect(response.body).toEqual({
				id: 2,
			    product_name: 'Logitech MX mouse',
			    product_price: 20,
			    product_category: 'Computer Parts'
			});	
	});
});
