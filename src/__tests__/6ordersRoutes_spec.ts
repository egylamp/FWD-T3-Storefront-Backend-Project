import supertest from "supertest";
import app from "../server";
//  create a request object
const request = supertest(app);
let token;
describe("Test orders routes endpoints", () => {
	beforeAll(async () => {
		const response = await request.post("/users/login").send({
			"username": "abdelkawy",
			"password": "password123"
		});
		token = response.body;
	});

	it("Index orders endpoint return orders list", async () => {
		const response = await request.get("/orders");
		expect(response.body).toEqual([
			{
				id: 1,
				user_id: 1,
				order_status: 'active'
			}
		]);
	});

	it("Create order endpoint to return specific error without token", async () => {
		const response = await request.post("/orders");
		expect(response.body).toBe("Access denied, invalid token");
	});

	it("Create order endpoint return current order", async () => {
		const response = await request.post("/orders").send({
				"user_id": "2"
		}).set("authorization", 'Bearer '+token);
		//expect(response.status).toBe(200);
		expect(response.body).toEqual({ id: 2, user_id: 2, order_status: 'active' });
        //console.log(response.body);
	});

	it("Add product to order endpoint works", async () => {
		const response = await request.post("/orders/2/product").send({
				"product_id": "2",
				"quantity": "5"
		}).set("authorization", 'Bearer '+token);
		expect(response.body).toEqual({ id: 1, quantity: 5, order_id: 2, product_id: 2 });
		//expect(response.status).toBe(200);
        //console.log(response.body);
	});
});
