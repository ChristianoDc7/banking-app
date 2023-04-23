import React from 'react'
import { useBankingMutation } from '../useBankingMutation'
import { USER_API_URL } from '../../services/ApiUrls'
import HttpModule from '../../services/Axios'

export const useDeleteUser = () => {
    return useBankingMutation(
        (id: number) => HttpModule.delete(`${USER_API_URL}/${id}`)
    )
}
