import { initFirestore } from '@next-auth/firebase-adapter'
import { cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export const firestore = initFirestore({
	credential: cert(
		JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string)
	),
})

export const db = getFirestore()
