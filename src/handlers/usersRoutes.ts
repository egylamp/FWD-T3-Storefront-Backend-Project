import { Application, Request, Response } from "express";
import { User, usersManage } from "../models/usersModel";
import jwt from "jsonwebtoken";
import tokenVerify from '../middlewares/token_verify_middleware';
import dotenv from "dotenv";
dotenv.config();

const users = new usersManage();

const index = async (_req: Request, res: Response) => {
	try {
		const authorizedHeader = _req.headers.authorization;
		const token = authorizedHeader.split(" ")[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		res.status(401);
		res.json("Access denied, invalid token");
		return;
	}
	try {
		const usersData = await users.indexUsers();
		res.json(usersData);
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
		const user = await users.showUser(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const create = async (req: Request, res: Response) => {
	const user: User = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		password: req.body.password,
	};
	try {
		const newUser = await users.createUser(user);
		const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json("Error: cannot create user token");
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const userData = await users.userLogin(req.body.username, req.body.password);
		var token = jwt.sign({ user: userData }, process.env.TOKEN_SECRET);
		res.json(token);
	} catch (error) {
		res.status(401);
		res.json("Invalid username or password.");
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
		const user = await users.userDelete(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(`${err}`);
	}
};

const userRoutes = (app: Application) => {
	app.get("/users", index);
	app.get("/users/:id", tokenVerify, show);
	app.post("/users", create);
	app.post("/users/login", login);
	app.delete("/users/:id", tokenVerify, destroy);
};

export default userRoutes;
