import { NextFunction, Response } from "express";
import { UserEntities } from "../entities/UserEntities";
import { RequestWithPayload } from "../types/userTypes";

export function verifyUserCreatePayload(user: UserEntities) {
    if([user.username, user.password].every(v => typeof v==="string" && !!v.trim()) && [1,2].includes(Number(user.role))) return true;
    return false;
}

export const isAdmin = (role: number) => role === 1;
export const isOwner = (reqId: number, baseId: number) => Number(reqId) === Number(baseId);

export const AdminMiddleware = (req: RequestWithPayload, res: Response) => {
    if(!isAdmin(req.payload?.role ||0)){
        res.status(403).send('You are not allowed to create users');
        return;
    }
}

export const OwnerMiddleware = (req: RequestWithPayload, res: Response) => {
    if(!isAdmin(req.payload?.role ||0) || isOwner(req.payload?.id ||0, parseInt(req.params.id))){
        res.status(403).send('You are not allowed to update users');
        return;
    }
}

