import { Product, productsManage } from "../models/productsModel";

const pManage = new productsManage();

describe("Test Products Model", () => {
	it("Products model should have an index method", () => {
		expect(pManage.indexProducts).toBeDefined();
	});
	it("Products model should have a create method", () => {
		expect(pManage.createProduct).toBeDefined();
	});
	it("Products model should have a delete method", () => {
		expect(pManage.productDelete).toBeDefined();
	});

	it("The index function return array", async () => {
		const result = await pManage.indexProducts();
		expect(result).toEqual([]);
	});

	it("The create method should add a product", async () => {
		const result = await pManage.createProduct({
			product_name: "Porodo mechanical keyboard",
			product_price: 17,
			product_category: "Computer Parts",
		});
		expect(result).toEqual({
			id: 1,
			product_name: "Porodo mechanical keyboard",
			product_price: 17,
			product_category: "Computer Parts",
		});
	});

	it("The index method should return a list of products", async () => {
		const result = await pManage.indexProducts();
		expect(result).toEqual([
			{
				id: 1,
				product_name: "Porodo mechanical keyboard",
				product_price: 17,
				product_category: "Computer Parts",
			},
		]);
	});

	it("The show method should return the correct product", async () => {
		const result = await pManage.showProduct("1");
		expect(result).toEqual({
			id: 1,
			product_name: "Porodo mechanical keyboard",
			product_price: 17,
			product_category: "Computer Parts",
		});
	});
});
