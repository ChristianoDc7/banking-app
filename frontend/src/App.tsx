import { Suspense } from 'react'
import './App.css'
import { Button, ConfigProvider } from 'antd'
import { Theme } from './config/Theme'
import { BrowserRouter } from 'react-router-dom'
import { MainLoader } from './widgets/MainLoader'
import { RouteProps, Routes } from './config/Route'
import userRoute from './pages/Routes'

function App() {
	return (
		<ConfigProvider theme={Theme}>
			<Suspense fallback={<MainLoader />}>
				<BrowserRouter>
					<Routes routes={userRoute}/>
				</BrowserRouter>
			</Suspense>
		</ConfigProvider>
	)
}

export default App
