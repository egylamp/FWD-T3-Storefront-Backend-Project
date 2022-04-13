import { Application, Request, Response } from 'express';
import { Order, ordersManage } from '../models/ordersModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const oManage = new ordersManage();

const index = async (_req: Request, res: Response) => {
	const orders = await oManage.indexOrders();
	res.json(orders);
};

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
	const order = await oManage.showOrders(req.params.uid);
	res.json(order);
};

const complete = async (req: Request, res: Response) => {
	try {
		const authorizedHeader = req.headers.authorization;
		const token = authorizedHeader.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	const order = await oManage.showCompleted(req.params.uid);
	res.json(order);
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
		const order: Order = {
			user_id: req.body.uid,
			status: 'active',
		};
		const newProduct = await oManage.createOrder(order);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
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
	const user = await oManage.orderDelete(req.params.id);
	res.json(user);
};

const ordersRoutes = (app: Application) => {
	app.get('/orders', index);
	app.get('/orders/:uid', show);
	app.get('/orders/:uid/completed', complete);
	app.post('/orders', create);
	app.delete('/orders/:id', destroy);
};

export default ordersRoutes;
