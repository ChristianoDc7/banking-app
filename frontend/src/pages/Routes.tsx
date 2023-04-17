import React from 'react'
import { RouteProps } from '../config/Route'
import DashboardRoutes from './dashboard/Routes'

const MainLayout = React.lazy(() => import('../components/layout/MainLayout'))
const RegistrationLayout = React.lazy(() => import('../components/layout/RegistrationLayout'))

const Routes :  RouteProps[] = [
  {
      path: '/',
      element: <MainLayout />, //For global App layout
      children: [
        ...DashboardRoutes
      ]
  },
  {
      path: '/login',
      element: <RegistrationLayout />, //For registration & login layout
      children: [
        //   ...UserRoutes, 
      ]
  }
]

export default Routes