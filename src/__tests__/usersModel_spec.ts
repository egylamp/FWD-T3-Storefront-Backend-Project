import { User, usersManage } from '../models/usersModel';

const uManage = new usersManage();

describe('Test Users Model', () => {
	it('should an index method', () => {
		expect(uManage.indexUsers).toBeDefined();
	});
	it('should have a create method', () => {
		expect(uManage.createUser).toBeDefined();
	});
	it('should have a delete method', () => {
		expect(uManage.userDelete).toBeDefined();
	});

	it('The index function return array', async () => {
		const result = await uManage.indexUsers();
		expect(result).toEqual([]);
	});

	it('create method should add a user', async () => {
		const result = await uManage.createUser({
			username: 'user001',
			password: 'password123',
			firstname: 'First',
			lastname: 'User',
		});
		expect(result).toEqual({
			id: 1,
			firstname: 'First',
			lastname: 'User',
		});
	});

	it('index method should return a list of users', async () => {
		const result = await uManage.indexUsers();
		expect(result).toEqual([
			{
				id: 1,
				firstname: 'First',
				lastname: 'User',
			},
		]);
	});
});
