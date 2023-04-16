import moment from "moment";
import { BankingDataSource } from "../db/DataSources";
import { TransactionEntities } from "../entities/TransactionEntities";
import { userRepository } from "./UserRepositories";
import { UserEntities } from "../entities/UserEntities";

const TransactionRepository = BankingDataSource.getRepository(TransactionEntities);

export const getAllTransactions = async () => {
    return await TransactionRepository.find();
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
