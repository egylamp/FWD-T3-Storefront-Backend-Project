import { Application, Request, Response } from "express";
import { User, UsersManage } from "../models/userModel";

const users = new UsersManage();

const index = async (_req: Request, res: Response) => {
  const usersData = await users.index()
  res.json(usersData)
}

const show = async (req: Request, res: Response) => {
   const user = await users.show(req.body.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
        }

        const newUser = await users.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await users.delete(req.body.id)
    res.json(deleted)
}

const userRoutes = (app: Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default userRoutes;