import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type Plan = 'free' | 'pro'

export function PackagePage() {
	const [plan, setPlan] = useState<Plan>('free')
	const navigate = useNavigate()

	return (
		<div className="fade-in" style={{ display: 'grid', gap: 16 }}>
			<h2>Select a Plan</h2>
			<div className="row cols-2">
				<PlanCard
					title="Free"
					desc="Create a single QR with essential info. Download and set as wallpaper."
					price="Free"
					features={["Name, Emergency Number, Age, Blood Group, Address", "Text-only QR (scannable)", "Download image"]}
					selected={plan === 'free'}
					onSelect={() => setPlan('free')}
				/>
				<PlanCard
					title="Premium"
					desc="Include a PDF link and richer info."
					price="₹500/year or ₹149/month"
					note="Includes up to 10 QR codes"
					features={["All Free features", "Add a public PDF link", "Best for medical certificates"]}
					selected={plan === 'pro'}
					onSelect={() => setPlan('pro')}
				/>
			</div>
			<div style={{ display: 'flex', gap: 8 }}>
				<button className="btn" onClick={() => navigate(plan === 'free' ? '/generate/free' : '/generate/premium')}>Select {plan === 'free' ? 'Free' : 'Premium'}</button>
				<button className="btn secondary" onClick={() => navigate('/learn')}>Learn More</button>
			</div>
		</div>
	)
}

function PlanCard({ title, desc, price, note, features, selected, onSelect }:
	{ title: string; desc: string; price: string; note?: string; features: string[]; selected: boolean; onSelect: () => void }) {
	return (
		<div className="card" style={{ display: 'grid', gap: 8, borderColor: selected ? '#d62828' : undefined }}>
			<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
				<h3 style={{ margin: 0 }}>{title}</h3>
				<span style={{ color: '#ffd166', fontWeight: 700 }}>{price}</span>
			</div>
			{note && <div style={{ color: '#bbbbc2' }}>{note}</div>}
			<p style={{ margin: 0, color: '#bbbbc2' }}>{desc}</p>
			<ul style={{ margin: 0 }}>
				{features.map((f) => (<li key={f}>{f}</li>))}
			</ul>
			<div>
				<button className={`btn ${selected ? '' : 'secondary'}`} onClick={onSelect}>Choose {title}</button>
			</div>
		</div>
	)
}


