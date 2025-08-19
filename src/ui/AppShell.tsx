import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
	const location = useLocation()
	const navigate = useNavigate()
	const showBack = location.pathname !== '/home'

	function onBack() {
		if (window.history.length > 1) navigate(-1)
		else navigate('/home')
	}

	return (
		<div>
			<header className="header">
				<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
					{showBack && (
						<button className="btn secondary" onClick={onBack}>Back</button>
					)}
					<Link to="/home" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: 10 }}>
						<div className="logo"><span style={{ color: '#d62828', fontWeight: 800 }}>QR</span></div>
						<h1>ResQCard</h1>
					</Link>
				</div>
				<nav style={{ display: 'flex', gap: 10 }}>
					<Link to="/learn" className="btn secondary">Learn</Link>
					<Link to="/packages" className="btn">Start</Link>
				</nav>
			</header>
			<main style={{ padding: 16, maxWidth: 960, margin: '0 auto' }}>{children}</main>
		</div>
	)
}


