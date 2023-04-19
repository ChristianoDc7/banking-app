import React from 'react'
import { useBankingMutation } from '../useBankingMutation'
import { LoginPayload, TLoginReturn } from '../../../types/User'
import HttpModule from '../../services/Axios'
import { LOGIN_API_URL } from '../../services/ApiUrls'

export const useLogin = () => {
  return useBankingMutation<TLoginReturn, any>(
    (data: LoginPayload) => {
      return HttpModule.post(LOGIN_API_URL, data)
    }
  )
}
