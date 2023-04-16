import express from "express";
import { createTransaction, getAllTransactions } from "../repositories/TransactionRepository";
import { RequestWithPayload } from "../types/userTypes";
import { AdminMiddleware, OwnAccountMiddleware, verifyTransactionPayload } from "../utils/Utils";
import { TransactionRoute, TransactionRoutes } from "./ApiRoutes";

const router = express.Router();

router.get(TransactionRoutes, async function (req: RequestWithPayload, res, next) {
    try {
        const transactions = await getAllTransactions(req?.payload?.id || 0)
        if (!!transactions) {
            res.json(transactions);
        } else {
            res.status(404).send('No Transactions Found');
        }
    } catch (err) {
        console.error(`Error while getting transactions`, err);
        next(err);
    }
})

router.post(TransactionRoute, async function (req: RequestWithPayload, res, next) {
    try {
        if (verifyTransactionPayload(req.body)) {
            const transaction = await createTransaction({...req.body, senderId: req.payload?.id})
            
            if (!!transaction) {
                res.json("Transaction succcessfull");
                return;
            } else {
                res.status(500).send('An error occurred while creating the transaction');
                return
            }
        } else {
            res.status(400).send('Some payload are required or in invalid format');
            return;
        }
    } catch (err) {
        console.error(`Error while creating transaction`, err);
        next(err);
    }
});

export default router;