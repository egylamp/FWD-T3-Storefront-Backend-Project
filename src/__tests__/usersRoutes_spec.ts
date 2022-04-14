import supertest from 'supertest';
import app from '../server';

//  create a request object
const request = supertest(app);
describe('Test users routes endpoints', () => {
	it('Gets all users endpoint fail without token', async () => {
		const response = await request.get('/users');
		expect(response.status).toBe(401);
	});
	it('Create user return token', async () => {
		const response = await request.post('/users');
		expect(response.status).toBe(200);
	});
});
