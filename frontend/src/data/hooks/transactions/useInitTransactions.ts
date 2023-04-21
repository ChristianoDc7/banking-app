import React from 'react'
import { useBankingMutation } from '../useBankingMutation'
import { TTransactionInput } from '../../../types/Transaction'
import HttpModule from '../../services/Axios'
import { TRANSACTION_API_URL } from '../../services/ApiUrls'

export const useInitTransactions = () => {
  return useBankingMutation(
        (TransactionInfo : TTransactionInput) =>
        HttpModule.post(TRANSACTION_API_URL, TransactionInfo) 
  )
}
