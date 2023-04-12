import { ObjectId } from "mongodb"

export default interface IUser {
	name: string
	email: string
	image: string
	emailVerified: Date | null
	acceptedTerms: Date | null
	acceptedPrivacy: Date | null
	createdAt: Date
	updatedAt: Date
	opportunitiesPursued: recruiterOpportunity[]
	totalEarnings: number
	potentialEarnings: number
}

type recruiterOpportunity = {
	opportunity: ObjectId
	status: string
	createdAt: Date
	updatedAt: Date
}
