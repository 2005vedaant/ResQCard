import { Link } from 'react-router-dom'

export function HomePage() {
	return (
		<div className="fade-in" style={{ display: 'grid', gap: 16 }}>
			<h2>Welcome</h2>
			<p style={{ color: '#bbbbc2' }}>Create an emergency QR linking to your critical details.</p>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
				<Link to="/packages" className="btn" style={{ textAlign: 'center' }}>Start Generating QR Code</Link>
				<Link to="/learn" className="btn secondary" style={{ textAlign: 'center' }}>Learn More / How to Use</Link>
			</div>
		</div>
	)
}


