import { Order, ordersManage } from '../models/ordersModel';

const oManage = new ordersManage();

describe('Test Order Model', () => {
	it('should an index method', () => {
		expect(oManage.indexOrders).toBeDefined();
	});
	it('should have a create method', () => {
		expect(oManage.createOrder).toBeDefined();
	});
	it('should have a delete method', () => {
		expect(oManage.orderDelete).toBeDefined();
	});

	it('The index function return array', async () => {
		const result = await oManage.indexOrders();
		expect(result).toEqual([]);
	});

	it('create method should add a order', async () => {
		const result = await oManage.createOrder({
			user_id: 1,
			status: 'active',
		});
		expect(result).toEqual({
			id: 1,
			user_id: 1,
			status: 'acive',
		});
	});

	it('index method should return a list of orders', async () => {
		const result = await oManage.indexOrders();
		expect(result).toEqual([
			{
				id: 1,
				user_id: 1,
				status: 'acive',
			},
		]);
	});

	it('show completed orders method should return array', async () => {
		const result = await oManage.showCompleted('1');
		expect(result).toEqual([]);
	});
});
