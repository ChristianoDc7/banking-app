import React from 'react'
import { useBankingQuery } from '../useBankingQuery'
import HttpModule from '../../services/Axios'
import { TRANSACTIONS_API_URL } from '../../services/ApiUrls'
import { TTransaction } from '../../../types/Transaction'

export const useGetTransactions = () => {
  return useBankingQuery<TTransaction[]>(
    'transactions.getAll',
    () => HttpModule.get(TRANSACTIONS_API_URL)
  )
}
