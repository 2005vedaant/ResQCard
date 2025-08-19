import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppShell } from './ui/AppShell'
import { LoadingScreen } from './pages/Loading'
import { AuthPage } from './pages/Auth'
import { HomePage } from './pages/Home'
import { PackagePage } from './pages/Package'
import { GenerateFreePage } from './pages/GenerateFree'
import { GeneratePremiumPage } from './pages/GeneratePremium'
import { LearnMorePage } from './pages/LearnMore'
import { ViewProfilePage } from './pages/ViewProfile'
import './styles.css'

const router = createBrowserRouter([
	{ path: '/', element: <LoadingScreen /> },
	{ path: '/auth', element: <AuthPage /> },
	{ path: '/home', element: <AppShell><HomePage /></AppShell> },
	{ path: '/learn', element: <AppShell><LearnMorePage /></AppShell> },
	{ path: '/packages', element: <AppShell><PackagePage /></AppShell> },
	{ path: '/generate/free', element: <AppShell><GenerateFreePage /></AppShell> },
	{ path: '/generate/premium', element: <AppShell><GeneratePremiumPage /></AppShell> },
	{ path: '/v/:id', element: <ViewProfilePage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)


