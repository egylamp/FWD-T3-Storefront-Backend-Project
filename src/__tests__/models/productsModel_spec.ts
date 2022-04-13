import { Product, productsManage } from '../../models/productsModel'

const pManege = new productsManage()

describe('Test Product model', () => {
	it('The products class has an index function', () => {
		expect(pManege.indexProducts).toBeDefined()
	})

	it('should have a create method', () => {
		expect(pManege.createProduct).toBeDefined()
	})

	it('The index function return array', async () => {
		const result = await pManege.indexProducts()
		expect(result).toEqual([])
	})

	it('create method should add a product', async () => {
		const result = await pManege.createProduct({
			name: 'Porodo mechanical keyboard',
			price: 17,
			category: 'Computer Parts',
		})
		expect(result).toEqual({
			id: 1,
			name: 'Porodo mechanical keyboard',
			price: 17,
			category: 'Computer Parts',
		})
	})

	it('index method should return a list of products', async () => {
		const result = await pManege.indexProducts()
		expect(result).toEqual([
			{
				id: 1,
				name: 'Porodo mechanical keyboard',
				price: 17,
				category: 'Computer Parts',
			},
		])
	})

	it('show method should return the correct product', async () => {
		const result = await pManege.showProduct('1')
		expect(result).toEqual({
			id: 1,
			name: 'Porodo mechanical keyboard',
			price: 17,
			category: 'Computer Parts',
		})
	})
})
