import React from 'react'
import { RouteProps } from '../config/Route'
import DashboardRoutes from './dashboard/Routes'
import LoginRoutes from './user/Routes'

const MainLayout = React.lazy(() => import('../components/layout/MainLayout'))
const RegistrationLayout = React.lazy(() => import('../components/layout/RegistrationLayout'))

const Routes: RouteProps[] = [
	{
		path: '/',
		element: <MainLayout />, //For global App layout
		children: [
			...DashboardRoutes
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