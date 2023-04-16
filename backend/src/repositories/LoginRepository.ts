import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { generateToken } from "../auth/Auth";
import { userRepository } from "./UserRepositories";

export const verifyUSer = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).send('Credentials are required');
		return;
	} else {

		const userFound = await userRepository.findOneBy({ username: username })

		if (!userFound) {
			res.status(401).send('Invalid username or password');
			return;
		}

		bcrypt.compare(password, userFound.password, (err, match) => {
			if (err) {
				console.log(err);
				res.status(500).send('Error comparing password');
				return;
			}

			if (!match) {
				res.status(401).send('Invalid username or password');
				return;
			}

			const token = generateToken(userFound);
			res.json({ token });
		});

	}
}