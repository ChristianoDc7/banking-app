import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from './types/userTypes';
import { verifyToken } from './auth/Auth';
import { BankingDataSource } from './db/DataSources';
import { verifyUSer } from './repositories/LoginRepository';
import UserController from './controllers/UserControllers';

const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(verifyToken);

BankingDataSource.initialize()

app.use(UserController);

// Login route
app.post('/login', verifyUSer);

// Protected route
app.get('/hello', verifyToken, (req: Request<ParamsDictionary, any, User>, res: Response) => {
  res.json({ message: `Welcome ${req.query.name}!` });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
