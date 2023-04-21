export type TTransaction = {
    id?: string;
    description?: string;
    receiverName?: string;
    senderName?: string;
    senderId?: number;
    receiverId?: number;
    amount?: number;
    date?: string;
}

export type TTransactionInput = {
    description?: string;
    receiverId?: number;
    amount?: number;
}