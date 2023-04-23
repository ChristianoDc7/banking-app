import React from 'react'
import { useBankingMutation } from '../useBankingMutation'
import HttpModule from '../../services/Axios'
import { USER_API_URL } from '../../services/ApiUrls'
import { TUser } from '../../../types/User'

export const useCreateUser = () => {
  return useBankingMutation(
    (user: TUser) => HttpModule.post(USER_API_URL, user)
  )
}
