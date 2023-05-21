import { initFirestore } from '@next-auth/firebase-adapter'
import { cert } from 'firebase-admin/app'

export const firestore = initFirestore({
	credential: cert(
		JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string)
	),
})
