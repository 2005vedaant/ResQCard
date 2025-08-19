import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'

type FormData = {
	name: string
	emergencyNumber: string
	age: string
	address: string
	bloodGroup: string
	pdfUrl?: string
}

export function GeneratePremiumPage() {
	const [form, setForm] = useState<FormData>({ name: '', emergencyNumber: '', age: '', address: '', bloodGroup: '' })
	const [qrData, setQrData] = useState<string | null>(null)
	const [qrUrl, setQrUrl] = useState<string>('')

	function update<K extends keyof FormData>(key: K, value: FormData[K]) {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	function buildTextPayload() {
		const lines = [
			'ResQCard (Premium)',
			`Name: ${form.name}`,
			`Emergency: ${form.emergencyNumber}`,
			`Age: ${form.age}`,
			`Blood Group: ${form.bloodGroup}`,
			`Address: ${form.address}`,
		]
		const trimmed = (form.pdfUrl || '').trim()
		if (trimmed) lines.push(`PDF: ${trimmed}`)
		return lines.filter(Boolean).join('\n')
	}

	async function onGenerate() {
		const payload = buildTextPayload()
		setQrData(payload)
		const dataUrl = await QRCode.toDataURL(payload, { width: 300, margin: 1 })
		setQrUrl(dataUrl)
	}

	const validPdf = useMemo(() => {
		const u = (form.pdfUrl || '').trim()
		return u.startsWith('http://') || u.startsWith('https://')
	}, [form.pdfUrl])

	// qrUrl is a PNG data URL generated client-side for reliable downloads

	return (
		<div className="fade-in" style={{ display: 'grid', gap: 16 }}>
			<h2>Generate QR Code (Premium)</h2>
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
					<label>Public PDF URL (optional)</label>
					<input value={form.pdfUrl || ''} onChange={e => update('pdfUrl', e.target.value)} placeholder="https://yourdomain.com/files/report.pdf" />
					<small style={{ color: '#bbbbc2' }}>Paste a public link (Google Drive/Dropbox/etc). It will be included as text in the QR.</small>
					{validPdf && (
						<div style={{ marginTop: 8 }}>
							<a className="btn secondary" href={form.pdfUrl} target="_blank" rel="noreferrer">View PDF</a>
						</div>
					)}
				</div>
				<button className="btn" onClick={onGenerate}>Generate QR</button>
			</div>

			{qrData && (
				<div className="card" style={{ display: 'grid', gap: 12 }}>
					<h3 style={{ margin: 0 }}>Your QR Code</h3>
					<div className="qr-wrap">
						<img className="qr-img" src={qrUrl} alt="QR Code" width={300} height={300} />
					</div>
					<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
						<a className="btn" href={qrUrl} download={`resqcard-premium.png`}>Download QR Code</a>
						{validPdf && <a className="btn secondary" href={form.pdfUrl} target="_blank" rel="noreferrer">View PDF</a>}
					</div>
					<p style={{ color: '#bbbbc2' }}>Scanning shows your details and the PDF link as text.</p>
				</div>
			)}

			<p style={{ color: '#bbbbc2' }}>QR service by qrserver.com</p>
			<Link to="/packages" className="btn secondary">Back to Plans</Link>
		</div>
	)
}


