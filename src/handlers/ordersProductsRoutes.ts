import { Application, Request, Response } from 'express';
import { OrderProduct, ordersProductsManage } from '../services/orderProducts';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const OPManage = new ordersProductsManage();

const show = async (req: Request, res: Response) => {
	try {
		const authorizedHeader = req.headers.authorization;
		const token = authorizedHeader.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	try {
		const order = await OPManage.listOrderProducts(req.params.id);
		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const authorizedHeader = req.headers.authorization;
		const token = authorizedHeader.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}

	try {
		const newProduct = await OPManage.addProduct(
			req.body.order_id,
			req.body.product_id,
			req.body.quantity
		);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const authorizedHeader = req.headers.authorization;
		const token = authorizedHeader.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	try {
		const user = await OPManage.orderProductDelete(req.params.oid, req.params.pid);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const ordersProductsRoutes = (app: Application) => {
	app.get('/orders/:id/products', show);
	app.post('/orders/:id/product', create);
	app.delete('/orders/:oid/product/:pid', destroy);
};

export default ordersProductsRoutes;
