import { User, usersManage } from "../models/usersModel";

const uManage = new usersManage();

describe("Test Users Model", () => {
	it("Users model should have an index method", () => {
		expect(uManage.indexUsers).toBeDefined();
	});

	it("Users model should have a create method", () => {
		expect(uManage.createUser).toBeDefined();
	});

	it("Users model should have a delete method", () => {
		expect(uManage.userDelete).toBeDefined();
	});

	it("The index method return array", async () => {
		const result = await uManage.indexUsers();
		expect(result).toEqual([]);
	});

	it("The create method should add a user", async () => {
		const result = await uManage.createUser({
			username: "abdelkawy",
			password: "abdo2022",
			firstname: "ABDELKAWY",
			lastname: "A. ABDELAZIZ"
		});
		expect(result).toEqual({
			id: 1,
			firstname: "ABDELKAWY",
			lastname: "A. ABDELAZIZ",
		});
	});

	it("The login method should return user data", async () => {
		const result = await uManage.userLogin("abdelkawy", "abdo2022");
		expect(result).toEqual({
			id: 1,
			firstname: "ABDELKAWY",
			lastname: "A. ABDELAZIZ",
		});
	});

	it("The index method should return a list of users", async () => {
		const result = await uManage.indexUsers();
		expect(result).toEqual([
			{
				id: 1,
				firstname: "ABDELKAWY",
				lastname: "A. ABDELAZIZ",
			},
		]);
	});
});
