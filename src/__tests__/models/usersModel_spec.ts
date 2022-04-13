import { User, usersManage } from '../../models/usersModel'

const uManege = new usersManage()

describe('Test Users model', () => {
	it('The users class has an index function', () => {
		expect(uManege.indexUsers).toBeDefined()
	})
	it('The index function return array', async () => {
		const result = await uManege.indexUsers()
		expect(result).toEqual([])
	})
})
