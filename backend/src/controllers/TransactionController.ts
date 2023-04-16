import express from "express";
import { createTransaction, getAllTransactions } from "../repositories/TransactionRepository";
import { RequestWithPayload } from "../types/userTypes";
import { AdminMiddleware, OwnAccountMiddleware, verifyTransactionPayload } from "../utils/Utils";
import { TransactionRoute, TransactionRoutes } from "./ApiRoutes";

const router = express.Router();

router.get(TransactionRoutes, async function (req: RequestWithPayload, res, next) {
    try {
        AdminMiddleware(req, res);
        const transactions = await getAllTransactions()
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
        OwnAccountMiddleware(req, res, next)
        if (verifyTransactionPayload(req.body)) {
            const transaction = await createTransaction(req.body)

            if (!!transaction) {
                res.json("Transaction succcessfull");
            } else {
                res.status(500).send('An error occurred while creating the transaction');
            }
        } else {
            res.status(400).send('Some payload are required or in invalid format');
        }
    } catch (err) {
        console.error(`Error while creating transaction`, err);
        next(err);
    }
});

export default router;