import React from 'react'
import { useBankingQuery } from '../useBankingQuery'
import HttpModule from '../../services/Axios'
import { USERS_API_URL } from '../../services/ApiUrls'
import { TUser } from '../../../types/User'

export const useGetUsers = () => {
    return useBankingQuery<TUser[]>(
        'users.getAll',
        () => HttpModule.get(USERS_API_URL)
    )
}
