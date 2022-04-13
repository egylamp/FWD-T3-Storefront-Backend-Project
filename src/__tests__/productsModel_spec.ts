import { Product, productsManage } from '../models/productsModel';

const pManage = new productsManage();

describe('Test Products Model', () => {
	it('should an index method', () => {
		expect(pManage.indexProducts).toBeDefined();
	});
	it('should have a create method', () => {
		expect(pManage.createProduct).toBeDefined();
	});
	it('should have a delete method', () => {
		expect(pManage.productDelete).toBeDefined();
	});

	it('The index function return array', async () => {
		const result = await pManage.indexProducts();
		expect(result).toEqual([]);
	});

	it('create method should add a product', async () => {
		const result = await pManage.createProduct({
			name: 'Porodo mechanical keyboard',
			price: 17,
			category: 'Computer Parts',
		});
		expect(result).toEqual({
			id: 1,
			name: 'Porodo mechanical keyboard',
			price: 17,
			category: 'Computer Parts',
		});
	});

	it('index method should return a list of products', async () => {
		const result = await pManage.indexProducts();
		expect(result).toEqual([
			{
				id: 1,
				name: 'Porodo mechanical keyboard',
				price: 17,
				category: 'Computer Parts',
			},
		]);
	});

	it('show method should return the correct product', async () => {
		const result = await pManage.showProduct('1');
		expect(result).toEqual({
			id: 1,
			name: 'Porodo mechanical keyboard',
			price: 17,
			category: 'Computer Parts',
		});
	});
});
