import { Application, Request, Response } from 'express'
import { Product, productsManage } from '../models/productsModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const pManage = new productsManage()

const index = async (_req: Request, res: Response) => {
	const products = await pManage.indexProducts()
	res.json(products)
}

const show = async (req: Request, res: Response) => {
	const product = await pManage.showProduct(req.params.id)
	res.json(product)
}

const byCategoty = async (req: Request, res: Response) => {
	const products = await pManage.productInCategory(req.params.category)
	res.json(products)
}

const create = async (req: Request, res: Response) => {
	try {
		const authorizedHeader = req.headers.authorization
		const token = authorizedHeader.split(' ')[1]
		jwt.verify(token, process.env.TOKEN_SECRET)
	} catch (err) {
		res.status(401)
		res.json('Access denied, invalid token')
		return
	}

	try {
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
		}

		const newProduct = await pManage.createProduct(product)
		res.json(newProduct)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const productsRoutes = (app: Application) => {
	app.get('/products', index)
	app.get('/products/:id', show)
	app.get('/products/category/:category', byCategoty)
	app.post('/products', create)
}

export default productsRoutes
