import React from 'react'
import { RouteProps } from '../config/Route'
import DashboardRoutes from './dashboard/Routes'
import TransactionRoutes from './transaction/Routes'
import UserRoutes from './user/Routes'
import LoginRoutes from './account/Routes'

const MainLayout = React.lazy(() => import('../components/layout/MainLayout'))
const RegistrationLayout = React.lazy(() => import('../components/layout/RegistrationLayout'))

const Routes: RouteProps[] = [
	{
		path: '/',
		element: <MainLayout />, //For global App layout
		children: [
			...DashboardRoutes,
			...UserRoutes,
			...TransactionRoutes
		]
	},
	{
		path: '/',
		element: <RegistrationLayout />, //For registration & login layout
		children: [
			...LoginRoutes
		]
	}
]

export default Routes