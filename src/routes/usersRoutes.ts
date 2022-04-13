import { Application, Request, Response } from "express";
import { User, usersManage } from "../models/usersModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const users = new usersManage();

const index = async (_req: Request, res: Response) => {
  try {
        const authorizedHeader = _req.headers.authorization
        const token = authorizedHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

  const usersData = await users.indexUsers()
  res.json(usersData)
}

const show = async (req: Request, res: Response) => {
  try {
        const authorizedHeader = req.headers.authorization
        const token = authorizedHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
   const user = await users.showUser(req.params.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
  const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
        }  
  try {
        const newUser = await users.createUser(user)
        
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json('Error: cannot create user token')
    }
}

const login = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
      const validUser = await users.userLogin(user.username, user.password)
      
      var token = jwt.sign({ user: validUser } , process.env.TOKEN_SECRET)
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json('Invalid username or password.')
  }
}

const userRoutes = (app: Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.post('/users/login', login)
}

export default userRoutes;