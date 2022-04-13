import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productsRoute from './handlers/productsRoutes';
import usersRoutes from './handlers/usersRoutes';
import ordersRoutes from './handlers/ordersRoutes';

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())

app.get('/store', function (req: Request, res: Response) {
    res.send('Welcome to MyStore!')
})

productsRoute(app);
usersRoutes(app);
ordersRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
