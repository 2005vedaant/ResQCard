import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProfileById } from '../services/data'

type Profile = {
	name: string
	emergencyNumber: string
	age: string
	address: string
	bloodGroup: string
	medicalUrl?: string
}

export function ViewProfilePage() {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [profile, setProfile] = useState<Profile | null>(null)
	const [loading, setLoading] = useState(true)

	const queryEmbedded = useMemo(() => {
		const hasUnderscore = id === '_'
		const params = new URLSearchParams(location.search)
		const d = params.get('d')
		return hasUnderscore && d ? d : null
	}, [id, location.search])

	useEffect(() => {
		let mounted = true
		async function run() {
			if (!id) return
			if (queryEmbedded) {
				try {
					const json = decodeURIComponent(queryEmbedded)
					const raw = decodeURIComponent(escape(atob(json)))
					const parsed = JSON.parse(raw)
					if (mounted) setProfile(parsed)
				} catch {
					if (mounted) setProfile(null)
				} finally {
					setLoading(false)
				}
				return
			}
			const p = await getProfileById(id)
			if (mounted) setProfile(p)
			setLoading(false)
		}
		run()
		return () => { mounted = false }
	}, [id, queryEmbedded])

	if (loading) return <div className="center"><div className="logo pulse" /><p>Loading…</p></div>
	if (!profile) return <div className="center"><p>Profile not found</p></div>

	return (
		<div style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div className="logo"><span style={{ color: '#d62828', fontWeight: 800 }}>QR</span></div>
					<h2 style={{ margin: 0 }}>ResQCard</h2>
				</div>
				<div>
					<button className="btn secondary" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/home'))}>Back</button>
				</div>
			</div>
			<div className="spacer" />
			<div className="card" style={{ display: 'grid', gap: 12 }}>
				<h3 style={{ margin: 0 }}>Emergency Profile</h3>
				<div className="row cols-2">
					<div className="field"><label>Name</label><div>{profile.name}</div></div>
					<div className="field"><label>Emergency Number</label><div>{profile.emergencyNumber}</div></div>
				</div>
				<div className="row cols-2">
					<div className="field"><label>Age</label><div>{profile.age}</div></div>
					<div className="field"><label>Blood Group</label><div>{profile.bloodGroup}</div></div>
				</div>
				<div className="field"><label>Address</label><div>{profile.address}</div></div>
				{profile.medicalUrl && (
					<div className="field"><label>Medical Certificate</label><a href={profile.medicalUrl} target="_blank" rel="noreferrer">View PDF</a></div>
				)}
			</div>
			<p style={{ color: '#bbbbc2', marginTop: 12 }}>If you are a first responder, please contact the emergency number above.</p>
		</div>
	)
}


