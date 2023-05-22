import { DefaultUser } from 'next-auth'
import { Timestamp } from 'firebase-admin/firestore'

export default interface IUser extends DefaultUser {
	acceptedTerms: Timestamp | null
	acceptedPrivacy: Timestamp | null
	createdAt: Timestamp
	updatedAt: Timestamp
	totalEarnings: number
	potentialEarnings: number
}
