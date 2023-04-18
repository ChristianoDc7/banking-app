import { Suspense } from 'react'
import './App.css'
import { Button, ConfigProvider } from 'antd'
import { Theme } from './config/Theme'
import { BrowserRouter } from 'react-router-dom'
import { MainLoader } from './widgets/MainLoader'
import { RouteProps, Routes } from './config/Route'
import userRoute from './pages/Routes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { config } from './data/services/Config'

function App() {
	
	const queryClient = new QueryClient({
        defaultOptions: config.query,
    })

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
