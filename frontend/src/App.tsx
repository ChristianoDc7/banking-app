import { Suspense, useEffect, useMemo } from 'react'
import './App.css'
import { Button, ConfigProvider } from 'antd'
import { Theme } from './config/Theme'
import { BrowserRouter } from 'react-router-dom'
import { MainLoader } from './widgets/MainLoader'
import { RouteProps, Routes } from './config/Route'
import userRoute from './pages/Routes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { config } from './data/services/Config'
import { useRedirections } from './config/useRedirections'

function App() {
	const path = useMemo(() => window.location.pathname, [window.location.pathname])
	const {checkAutorizedRoute} = useRedirections()

	const queryClient = new QueryClient({
        defaultOptions: config.query,
    })

	useEffect(()=>{
		checkAutorizedRoute(path)
	},[path])

	return (
		<ConfigProvider theme={Theme}>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<MainLoader />}>
					<BrowserRouter>
						<Routes routes={userRoute} />
					</BrowserRouter>
				</Suspense>
			</QueryClientProvider>
		</ConfigProvider>
	)
}

export default App
