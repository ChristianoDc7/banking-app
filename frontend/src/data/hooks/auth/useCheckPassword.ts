import React from 'react'
import { useBankingMutation } from '../useBankingMutation'
import HttpModule from '../../services/Axios'
import { CHECK_PASSWORD_API_URL } from '../../services/ApiUrls'

export const useCheckPassword = () => {
  return useBankingMutation(
     ({ password }) => HttpModule.post(CHECK_PASSWORD_API_URL, { password })
  )
}
