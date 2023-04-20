import moment from "moment";
import { BankingDataSource } from "../db/DataSources";
import { TransactionEntities } from "../entities/TransactionEntities";
import { userRepository } from "./UserRepositories";
import { UserEntities } from "../entities/UserEntities";
import { isAdmin } from "../utils/Utils";
import _ from "lodash";

const TransactionRepository = BankingDataSource.getRepository(TransactionEntities);

export const getAllTransactions = async (id: number) => {
    const users = await userRepository.find();
    const transactions = isAdmin(id) ? await TransactionRepository.find() : await TransactionRepository.findBy({ senderId: id });
    
    return transactions.map(transaction => {
        const sender = users.find(user => user.id === transaction.senderId);
        const receiver = users.find(user => user.id === transaction.receiverId);
        return {
            ..._.omit(transaction, ["senderId", "receiverId"]),
            senderName: sender?.username,
            receiverName: receiver?.username
        }
    })
}

export const createTransaction = async (transaction: TransactionEntities) => {
    const sender = await userRepository.findOneBy({ id: transaction.senderId });
    const receiver = await userRepository.findOneBy({ id: transaction.receiverId });

    if (!!sender && !!receiver && sender.amount >= (transaction.amount || 0)) {
        const updatedUsers = await BankingDataSource
        .createQueryBuilder()
        .update(UserEntities)
        .set({
            amount: () => `CASE WHEN id = ${sender.id} THEN ${sender.amount - (transaction.amount || 0)} ELSE ${receiver.amount + (transaction.amount || 0)} END`,
        })
        .where("id IN (:...ids)", { ids: [sender.id, receiver.id] })
        .execute()

        if (updatedUsers.affected == 2) {
            const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss');
            const dateId = moment().format('YYYYMMDD_HHmmss');
            return await TransactionRepository.save({
                ...transaction,
                id: `TR_${dateId}`,
                date: dateTime
            });
        }
    }

    return null
}
