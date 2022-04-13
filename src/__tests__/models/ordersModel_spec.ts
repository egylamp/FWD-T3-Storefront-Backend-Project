import { Order, ordersManage } from '../../models/ordersModel'

const oManege = new ordersManage()

describe('Test Order model', () => {
	it('The orders class has an index function', () => {
		expect(oManege.indexOrders).toBeDefined()
	})
	it('The index function return array', async () => {
		const result = await oManege.indexOrders()
		expect(result).toEqual([])
	})
})
