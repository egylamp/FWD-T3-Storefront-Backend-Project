import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenVerify = async (req: Request, res: Response, next: NextFunction) =>{
    try {
		const authorizedHeader = req.headers.authorization;
		const token = authorizedHeader.split(" ")[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
        next();
	} catch (err) {
		res.status(401);
		res.json("Access denied, invalid token");
		return;
	}
}

export default tokenVerify;