import express, { Request } from "express";
import { OneUserRoutes, UserRoutes } from "./ApiRoutes";
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from "../repositories/UserRepositories";
import _ from "lodash";
import { RequestWithPayload, RequestWithUser } from "../types/userTypes";
import { AdminMiddleware, OwnerMiddleware, isAdmin, isOwner, verifyUserCreatePayload } from "../utils/Utils";

const router = express.Router();

/* GET all users. */
router.get(UserRoutes, async function (req: RequestWithPayload, res, next) {
    try {
        AdminMiddleware(req, res);
        const users = await GetAllUsers()
        if (!!users) {
            res.json(users);
        } else {
            res.status(404).send('Users not found');
        }
    } catch (err) {
        console.error(`Error while getting users`, err);
        next(err);
    }
});


/* GET one user*/
router.get(OneUserRoutes + '/:id', async function (req, res, next) {
    try {
        if (!!req.params.id && _.isInteger(parseInt(req.params.id))) {
            const user = await GetUser(parseInt(req.params.id))
            if (!!user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('User id not valid form');
        }

    } catch (err) {
        console.error(`Error while getting user ${req.params.id}`, err);
        next(err);
    }
});

/* Create one user*/
router.post(OneUserRoutes, async function (req: RequestWithPayload, res, next) {
    try {
        AdminMiddleware(req, res);
        if (verifyUserCreatePayload(req.body)) {
            const user = await CreateUser(req.body)
            if (!!user) {
                res.json("User created");
            } else {
                res.status(500).send('An error occurred while creating the user');
            }
        } else {
            res.status(400).send('Some payload are required or in invalid format');
        }

    } catch (err) {
        console.error(`Error while creating user`, err);
        next(err);
    }
});

/* Update sets */
router.put(OneUserRoutes + '/:id', async (req: RequestWithPayload, res, next) => {
    try {
        OwnerMiddleware(req, res);
        const result = await UpdateUser(req.body, parseInt(req.params.id))
        res.json(result);
    } catch (err) {
        console.error(`Error while updating programming languages `, err);
        next(err);
    }
});

/* Delete one user */
router.delete(OneUserRoutes + '/:id', async (req, res, next) => {
    try {
        AdminMiddleware(req, res);
        const user = await GetUser(parseInt(req.params.id));

        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        await DeleteUser(parseInt(req.params.id))
        res.json("User deleted");
    } catch (err) {
        console.error(`Error while deleting programming languages `, err);
        next(err);
    }
});

export default router;