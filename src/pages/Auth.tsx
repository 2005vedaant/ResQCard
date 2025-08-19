import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function AuthPage() {
	const navigate = useNavigate()
	const [mode, setMode] = useState<'login' | 'signup'>('login')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			// Mock auth for MVP
			await new Promise(r => setTimeout(r, 600))
			if (mode === 'signup' && password !== confirm) {
				throw new Error('Passwords do not match')
			}
			navigate('/home')
		} catch (err) {
			setError((err as Error).message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="center" style={{ padding: 16 }}>
			<div className="card" style={{ width: 420, maxWidth: '100%' }}>
				<div style={{ marginBottom: 8, display: 'flex' }}>
					<button className="btn secondary" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/home'))}>Back</button>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
					<div className="logo"><span style={{ color: '#d62828', fontWeight: 800 }}>QR</span></div>
					<h2 style={{ margin: 0 }}>ResQCard</h2>
					<p style={{ color: '#bbbbc2', marginTop: 4 }}>Store life-saving info and share via QR</p>
				</div>
				<div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
					<button className={`btn full ${mode === 'login' ? '' : 'secondary'}`} onClick={() => setMode('login')}>Login</button>
					<button className={`btn full ${mode === 'signup' ? '' : 'secondary'}`} onClick={() => setMode('signup')}>Sign up</button>
				</div>
				<form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
					<div className="field">
						<label>Email</label>
						<input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
					</div>
					<div className="field">
						<label>Password</label>
						<input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
					</div>
					{mode === 'signup' && (
						<div className="field">
							<label>Confirm Password</label>
							<input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" />
						</div>
					)}
					{error && <div style={{ color: '#ff6b6b' }}>{error}</div>}
					<button className="btn" disabled={loading}>{loading ? 'Please wait…' : (mode === 'login' ? 'Login' : 'Create account')}</button>
				</form>
				<div style={{ marginTop: 12, textAlign: 'right' }}>
					<Link to="#" style={{ color: '#ffd166' }}>Forgot password?</Link>
				</div>
			</div>
		</div>
	)
}


