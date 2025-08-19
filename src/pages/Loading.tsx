import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoadingScreen() {
	const navigate = useNavigate()
	useEffect(() => {
		const t = setTimeout(() => navigate('/auth'), 1400)
		return () => clearTimeout(t)
	}, [navigate])
	return (
		<div className="center fade-in" style={{ background: '#ffc0cb', width: '100%' }}>
			<div className="logo pulse">
				<span style={{ fontWeight: 900, color: '#d62828', fontSize: 28 }}>RQ</span>
			</div>
			<div style={{ height: 12 }} />
			<h1 style={{ margin: 0 }}>ResQCard</h1>
			<p style={{ color: '#bbbbc2', marginTop: 8 }}>Your emergency info, one scan away.</p>
			<div style={{ marginTop: 24 }}>
				<div className="pulse" style={{ width: 36, height: 36, borderRadius: 18, border: '3px solid #d62828', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
			</div>
			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</div>
	)
}


