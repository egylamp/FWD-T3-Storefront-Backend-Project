import { Application, Request, Response } from "express";
import { Order, ordersManage } from "../models/ordersModel";
import tokenVerify from '../middlewares/token_verify_middleware';
//import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const oManage = new ordersManage();

const index = async (_req: Request, res: Response) => {
	try{
		const orders = await oManage.indexOrders();
		res.json(orders);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const show = async (req: Request, res: Response) => {
	// try {
	// 	const authorizedHeader = req.headers.authorization;
	// 	const token = authorizedHeader.split(" ")[1];
	// 	jwt.verify(token, process.env.TOKEN_SECRET);
	// } catch (err) {
	// 	res.status(401);
	// 	res.json("Access denied, invalid token");
	// 	return;
	// }
	try {
		const order = await oManage.showOrders(req.params.uid);
		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const complete = async (req: Request, res: Response) => {
	// try {
	// 	const authorizedHeader = req.headers.authorization;
	// 	const token = authorizedHeader.split(" ")[1];
	// 	jwt.verify(token, process.env.TOKEN_SECRET);
	// } catch (err) {
	// 	res.status(401);
	// 	res.json("Access denied, invalid token");
	// 	return;
	// }
	try {
		const order = await oManage.showCompleted(req.params.uid);
		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const create = async (req: Request, res: Response) => {
	// try {
	// 	const authorizedHeader = req.headers.authorization;
	// 	const token = authorizedHeader.split(" ")[1];
	// 	jwt.verify(token, process.env.TOKEN_SECRET);
	// } catch (err) {
	// 	res.status(401);
	// 	res.json("Access denied, invalid token");
	// 	return;
	// }

	try {
		const order: Order = {
			user_id: req.body.user_id,
			order_status: 'active'
		};
		const newProduct = await oManage.createOrder(order);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const destroy = async (req: Request, res: Response) => {
	// try {
	// 	const authorizedHeader = req.headers.authorization;
	// 	const token = authorizedHeader.split(" ")[1];
	// 	jwt.verify(token, process.env.TOKEN_SECRET);
	// } catch (err) {
	// 	res.status(401);
	// 	res.json("Access denied, invalid token");
	// 	return;
	// }
	try {
		const user = await oManage.orderDelete(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const ordersRoutes = (app: Application) => {
	app.get("/orders", index);
	app.get("/orders/:uid", tokenVerify, show);
	app.get("/orders/:uid/completed", tokenVerify, complete);
	app.post("/orders", tokenVerify, create);
	app.delete("/orders/:id", tokenVerify, destroy);
};

export default ordersRoutes;
