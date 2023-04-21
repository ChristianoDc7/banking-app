import express, { Request } from "express";
import { OneUserIdRoutes, OneUserRoutes, UserRoutes } from "./ApiRoutes";
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from "../repositories/UserRepositories";
import _ from "lodash";
import { RequestWithPayload, RequestWithUser } from "../types/userTypes";
import { AdminMiddleware, OwnerMiddleware, isAdmin, isOwner, verifyUserCreatePayload } from "../utils/Utils";

const router = express.Router();

/* GET all users. */
router.get(UserRoutes, async function (req: RequestWithPayload, res, next) {
    try {
        const users = await GetAllUsers(req)
        if (!!users) {
            res.json(users);
            return;
        } else {
            res.status(404).send('Users not found');
            return;
        }
    } catch (err) {
        console.error(`Error while getting users`, err);
        next(err);
    }
});


/* GET one user*/
router.get(OneUserIdRoutes, async function (req, res, next) {
    if (OwnerMiddleware(req)) {
        try {
            if (!!req.params.id && _.isInteger(parseInt(req.params.id))) {
                const user = await GetUser(parseInt(req.params.id))
                if (!!user) {
                    res.json(user);
                    return;
                } else {
                    res.status(404).send('User not found');
                    return;
                }
            } else {
                res.status(400).send('User id not valid form');
                return;
            }

        } catch (err) {
            console.error(`Error while getting user ${req.params.id}`, err);
            next(err);
        }
    } else {
        res.status(403).send('You are not allowed to get this informations');
        return;
    }
});

/* Create one user*/
router.post(OneUserRoutes, async function (req: RequestWithPayload, res, next) {
    try {
        if (verifyUserCreatePayload(req.body)) {
            const user = await CreateUser(req.body)
            if (!!user) {
                res.json("User created");
                return;
            } else {
                res.status(500).send('An error occurred while creating the user');
                return;
            }
        } else {
            res.status(400).send('Some payload are required or in invalid format');
            return
        }

    } catch (err) {
        console.error(`Error while creating user`, err);
        next(err);
    }
});

/* Update user*/
router.put(OneUserIdRoutes, async (req: RequestWithPayload, res, next) => {
    if (AdminMiddleware(req)) {
        try {
            const result = await UpdateUser(req.body, parseInt(req.params.id))
            if (!_.isEmpty(result)) {
                res.json("User updated");
                return;
            }
            res.status(500).json("User may not exist are you don't have the permission")
        } catch (err) {
            console.error(`Error while updating user`, err);
            next(err);
        }
    } else {
        res.status(403).send('You are not allowed to update this informations');
        return;
    }
});

/* Delete one user */
router.delete(OneUserIdRoutes, async (req, res, next) => {
    if (AdminMiddleware(req)) {
        try {
            const user = await GetUser(parseInt(req.params.id));

            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            await DeleteUser(parseInt(req.params.id))
            res.json("User deleted");
        } catch (err) {
            console.error(`Error while deleting users`, err);
            next(err);
        }
    } else {
        res.status(403).send('You are not allowed to update this informations');
        return;
    }
});

export default router;