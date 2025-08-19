import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProfileAndGetId } from '../services/data'

type FormData = {
	name: string
	emergencyNumber: string
	age: string
	address: string
	bloodGroup: string
	medicalUrl?: string
}

export function GeneratePage() {
	const [form, setForm] = useState<FormData>({ name: '', emergencyNumber: '', age: '', address: '', bloodGroup: '' })
	const [file, setFile] = useState<File | null>(null)
	const [saving, setSaving] = useState(false)
	const [profileId, setProfileId] = useState<string | null>(null)

	function update<K extends keyof FormData>(key: K, value: FormData[K]) {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	async function onSave() {
		setSaving(true)
		try {
			const id = await saveProfileAndGetId(form, file || undefined)
			setProfileId(id)
		} finally {
			setSaving(false)
		}
	}

	const viewUrl = useMemo(() => profileId ? `${window.location.origin}/v/${profileId}` : '' , [profileId])
	const qrUrl = useMemo(() => profileId ? `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(viewUrl)}` : '', [viewUrl, profileId])

	return (
		<div className="fade-in" style={{ display: 'grid', gap: 16 }}>
			<h2>Generate QR Code</h2>
			<div className="card" style={{ display: 'grid', gap: 12 }}>
				<div className="row cols-2">
					<div className="field">
						<label>Name</label>
						<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" />
					</div>
					<div className="field">
						<label>Emergency Number</label>
						<input value={form.emergencyNumber} onChange={e => update('emergencyNumber', e.target.value)} placeholder="Contact number" />
					</div>
				</div>
				<div className="row cols-2">
					<div className="field">
						<label>Age</label>
						<input value={form.age} onChange={e => update('age', e.target.value)} type="number" placeholder="Age" />
					</div>
					<div className="field">
						<label>Blood Group</label>
						<input value={form.bloodGroup} onChange={e => update('bloodGroup', e.target.value)} placeholder="O+, A-, etc" />
					</div>
				</div>
				<div className="field">
					<label>Address</label>
					<textarea value={form.address} onChange={e => update('address', e.target.value)} placeholder="Home address" rows={3} />
				</div>
				<div className="field">
					<label>Upload Medical Certificate (optional)</label>
					<input onChange={e => setFile(e.target.files?.[0] || null)} type="file" accept="application/pdf" />
				</div>
				<button className="btn" onClick={onSave} disabled={saving}>{saving ? 'Saving…' : 'Save & Generate'}</button>
			</div>
			{profileId && (
				<div className="card" style={{ display: 'grid', gap: 12 }}>
					<h3 style={{ margin: 0 }}>Your QR Code</h3>
					<div className="qr-wrap">
						<img className="qr-img" src={qrUrl} alt="QR Code" width={260} height={260} />
					</div>
					<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
						<a className="btn" href={qrUrl} download={`resqcard-${profileId}.png`}>Download QR Code</a>
						<a className="btn secondary" href={viewUrl} target="_blank" rel="noreferrer">Open Profile Link</a>
					</div>
					<p style={{ color: '#bbbbc2' }}>Tip: Set the downloaded image as your lock screen wallpaper.</p>
				</div>
			)}
			<p style={{ color: '#bbbbc2' }}>QR service by qrserver.com</p>
			<Link to="/learn" className="btn secondary">How to Use</Link>
		</div>
	)
}


