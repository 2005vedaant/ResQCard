import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './firebase'

export type ProfileInput = {
	name: string
	emergencyNumber: string
	age: string
	address: string
	bloodGroup: string
}

export type SaveResult = { id: string; kind: 'cloud' | 'local' }

export async function saveProfileAndGetId(data: ProfileInput, pdf?: File): Promise<SaveResult> {
	try {
		let medicalUrl: string | undefined
		if (pdf) {
			const fileRef = ref(storage, `medical/${Date.now()}-${pdf.name}`)
			await uploadBytes(fileRef, pdf, { contentType: pdf.type })
			medicalUrl = await getDownloadURL(fileRef)
		}
		const docRef = await addDoc(collection(db, 'profiles'), { ...data, medicalUrl, createdAt: Date.now() })
		return { id: docRef.id, kind: 'cloud' }
	} catch (e) {
		const id = Math.random().toString(36).slice(2)
		const payload = { ...data, createdAt: Date.now() }
		localStorage.setItem(`profile:${id}`, JSON.stringify(payload))
		return { id, kind: 'local' }
	}
}

export async function getProfileById(id: string) {
	try {
		const snap = await getDoc(doc(collection(db, 'profiles'), id))
		return (snap.exists() ? snap.data() : null) as any
	} catch {
		const raw = localStorage.getItem(`profile:${id}`)
		return raw ? JSON.parse(raw) : null
	}
}


