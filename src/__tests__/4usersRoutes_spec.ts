import supertest from "supertest";
import app from "../server";
//  create a request object
const request = supertest(app);
let token;
describe("Test users routes endpoints", () => {
	beforeAll(async () => {
		const response = await request.post("/users/login").send({
			"username": "abdelkawy",
			"password": "password123"
		});
		token = response.body;
	});

	it("Index users endpoint fail without token", async () => {
		const response = await request.get("/users");
		expect(response.status).toBe(401);
	});

	it("Index users endpoint return users list", async () => {		
		const response = await request.get("/users").set("authorization", 'Bearer '+token);
		expect(response.body).toEqual([
			{
				id: 1,
				firstname: 'ABDELKAWY',
				lastname: 'A. ABDELAZIZ'
			},
		]);
	});

	it("Show user endpoint return users specific user", async () => {		
		const response = await request.get("/users/1").set("authorization", 'Bearer '+token);
		expect(response.body).toEqual(
			{
				id: 1,
				firstname: 'ABDELKAWY',
				lastname: 'A. ABDELAZIZ'
			}
		);
	});

	it("Create user endpoint to return specific error", async () => {
		const response = await request.post("/users");
		expect(response.body).toBe("Error: cannot create user token");
	});

	it("Create user endpoint NOT to return error", async () => {
		const response = await request.post("/users").send({
			"firstname": "ahmed",
			"lastname": "mounir",
			"username": "ahmed",
			"password": "pass123"
		});
		expect(response.status).toBe(200);
	});
});
