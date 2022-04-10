import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import booksRoute from './routes/booksRoute';
import userRoutes from './routes/userRoutes';

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Welcome to MyStore!')
})

booksRoute(app);
userRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})