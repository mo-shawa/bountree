import { ObjectId } from "mongodb"
import { DefaultUser } from "next-auth"

export default interface IUser extends DefaultUser {
	acceptedTerms: Date | null
	acceptedPrivacy: Date | null
	createdAt: Date
	updatedAt: Date
	opportunitiesPursued: RecruiterOpportunity[]
	totalEarnings: number
	potentialEarnings: number
}

export type RecruiterOpportunity = {
	_id: ObjectId | string
	opportunityId: ObjectId | string
	applicationId: ObjectId | string
	status: "pending" | "interviewing" | "rejected" | "hired"
	createdAt: Date
	updatedAt: Date
}
