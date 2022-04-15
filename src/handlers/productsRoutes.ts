import { Application, Request, Response } from "express";
import { Product, productsManage } from "../models/productsModel";
//import jwt from "jsonwebtoken";
import tokenVerify from '../middlewares/token_verify_middleware'
import dotenv from "dotenv";
dotenv.config();

const pManage = new productsManage();

const index = async (_req: Request, res: Response) => {
	try {
		const products = await pManage.indexProducts();
		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const product = await pManage.showProduct(req.params.id);
		res.json(product);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

//  const byCategoty = async (req: Request, res: Response) => {
// 	try{
//  	const products = await pManage.productInCategory(req.params.category);
//  	res.json(products);
// } catch(err){
// 	res.status(400);
// 	res.json(`${err}`);
// }
//  };

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
		const product: Product = {
			product_name: req.body.product_name,
			product_price: req.body.product_price,
			product_category: req.body.product_category,
		};

		const newProduct = await pManage.createProduct(product);
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
		const user = await pManage.productDelete(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const productsRoutes = (app: Application) => {
	app.get("/products", index);
	app.get("/products/:id", show);
	//app.get('/products/category/:category', byCategoty);
	app.post("/products", tokenVerify, create);
	app.delete("/products/:id", tokenVerify, destroy);
};

export default productsRoutes;
