import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from './types/userTypes';
import { verifyAuth, verifyToken } from './auth/Auth';
import { BankingDataSource } from './db/DataSources';
import { verifyUSer } from './repositories/LoginRepository';
import UserController from './controllers/UserControllers';
import TransactionController from './controllers/TransactionController';
import { LoginRoutes } from './controllers/ApiRoutes';

const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(verifyToken);
app.use(verifyAuth);

BankingDataSource.initialize()

app.use(UserController);
app.use(TransactionController);

// Login route
app.post(LoginRoutes, verifyUSer);

app.get('/hello', verifyToken, (req: Request<ParamsDictionary, any, User>, res: Response) => {
  res.json({ message: `Welcome ${req.query.name}!` });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});