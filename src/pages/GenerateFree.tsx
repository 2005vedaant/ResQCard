import { useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { Link } from 'react-router-dom'
import { saveProfileAndGetId } from '../services/data'

type FormData = {
	name: string
	emergencyNumber: string
	age: string
	address: string
	bloodGroup: string
}

export function GenerateFreePage() {
	const [form, setForm] = useState<FormData>({ name: '', emergencyNumber: '', age: '', address: '', bloodGroup: '' })
	const [saving, setSaving] = useState(false)
	const [profileId, setProfileId] = useState<string | null>(null)
	const [storageKind, setStorageKind] = useState<'cloud' | 'local' | null>(null)
	const [qrUrl, setQrUrl] = useState<string>('')
	const [generated, setGenerated] = useState(false)

	function update<K extends keyof FormData>(key: K, value: FormData[K]) {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	async function onGenerate() {
		setSaving(true)
		try {
			const result = await saveProfileAndGetId(form)
			setProfileId(result.id)
			setStorageKind(result.kind)
			// Build plain-text payload so scanners show text, not a link
			const qrText = [
				'ResQCard',
				`Name: ${form.name}`,
				`Emergency: ${form.emergencyNumber}`,
				`Age: ${form.age}`,
				`Blood Group: ${form.bloodGroup}`,
				`Address: ${form.address}`,
			].join('\n')
			const dataUrl = await QRCode.toDataURL(qrText, { width: 150, margin: 1 })
			setQrUrl(dataUrl)
			setGenerated(true)
		} finally {
			setSaving(false)
		}
	}

	const viewUrl = useMemo(() => {
		if (!profileId && storageKind !== 'local') return ''
		if (storageKind === 'local') {
			try {
				const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(form))))
				return `${window.location.origin}/v/_?d=${encodeURIComponent(encoded)}`
			} catch {
				return ''
			}
		}
		return `${window.location.origin}/v/${profileId}`
	}, [profileId, storageKind, form])

	return (
		<div className="fade-in" style={{ display: 'grid', gap: 16 }}>
			<h2>Generate QR Code (Free)</h2>
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
				<button className="btn" onClick={onGenerate} disabled={saving}>{saving ? 'Saving…' : 'Generate QR Code'}</button>
			</div>

			{generated && (
				<div className="card" style={{ display: 'grid', gap: 12 }}>
					<h3 style={{ margin: 0 }}>Your QR Code</h3>
					{storageKind === 'local' && (
						<p style={{ color: '#ffd166', margin: 0 }}>Note: Text-only QR shown. Configure Firebase to enable cloud link updates.</p>
					)}
					<div className="qr-wrap">
						<img className="qr-img" src={qrUrl} alt="QR Code" width={150} height={150} />
					</div>
					<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
						<a className="btn" href={qrUrl} download={`resqcard-${profileId || 'free'}.png`}>Download QR Code</a>
						{viewUrl && <a className="btn secondary" href={viewUrl} target="_blank" rel="noreferrer">Open Profile Link</a>}
					</div>
					<p style={{ color: '#bbbbc2' }}>Tip: Set the downloaded image as your lock screen wallpaper.</p>
				</div>
			)}

			<p style={{ color: '#bbbbc2' }}>QR service by qrserver.com</p>
			<Link to="/packages" className="btn secondary">Back to Plans</Link>
		</div>
	)
}


