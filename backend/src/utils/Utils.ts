import { NextFunction, Response } from "express";
import { UserEntities } from "../entities/UserEntities";
import { RequestWithPayload } from "../types/userTypes";
import { TransactionEntities } from "../entities/TransactionEntities";

export function verifyUserCreatePayload(user: UserEntities) {

    if ([user.username, user.password].every(v => typeof v === "string" && !!v.trim())
        && [1, 2].includes(Number(user.role))
        && user.password.length === 4
    ) return true;

    return false;
}

export function verifyTransactionPayload(transaction: TransactionEntities) {
    const { amount, receiverId, description } = transaction;
    if ([amount, receiverId].every(el => typeof el === "number") && (amount || 0) > 0 && !!description) return true;
    return false;
}

export const isAdmin = (role: number) => role === 1;
export const isOwner = (reqId: number, baseId: number) => Number(reqId) === Number(baseId);

export const AdminMiddleware = (req: RequestWithPayload) => {
    if (!isAdmin(req.payload?.role || 0)) {
        return false;
    }
    return true;
}

export const OwnerMiddleware = (req: RequestWithPayload) => {
    if (isAdmin(req.payload?.role || 0) || isOwner(req.payload?.id || 0, parseInt(req.params.id))) {
        return true;
    }
    return false;
}

export const OwnAccountMiddleware = (req: RequestWithPayload) => {
    if (!isOwner(req.payload?.id || 0, req.payload?.id || 0)) {
        return false;
    }
    return true;
}

export function matchPath(url: string, path: string) {
    const urlSegments = url.split('/');
    const pathSegments = path.split('/');

    if (urlSegments.length !== pathSegments.length) {
        return false;
    }

    for (let i = 0; i < pathSegments.length; i++) {
        if (pathSegments[i].charAt(0) === ':') {
            continue;
        } else if (pathSegments[i] !== urlSegments[i]) {
            return false;
        }
    }

    return true;
}