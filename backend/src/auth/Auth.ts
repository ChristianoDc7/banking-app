import { User } from "../types/userTypes";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserEntities } from "../entities/UserEntities";
import { SECRET_KEY } from "./AuthConfig";
import { LoginRoutes } from "../controllers/ApiRoutes";


// Function to generate JWT token
export function generateToken(user: UserEntities): string {
	const payload = { id: user.id, username: user.username, role: user.role };
	const options = { expiresIn: '1h' };
	const secret = SECRET_KEY;
	return jwt.sign(payload, secret, options);
}


// Middleware to verify JWT token
export function verifyToken(req: Request & { payload?: any }, res: Response, next: NextFunction) {

	if (req.path === LoginRoutes) {
		next();
		return;
	}

	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];
		jwt.verify(token, SECRET_KEY, (err, payload) => {
			if (err) {
				console.log(err);
				res.status(401).send('Invalid token');
			} else {
				req.payload = payload;
				next();
			}
		});
	} else {
		res.status(401).send('You need to pass a token');
	}
}