import type { Document, ObjectId } from "mongodb"
import IOpportunity from "./opportunity"
import IUser from "./user"

export default interface IApplication extends Document {
	_id?: ObjectId | string
	userId: ObjectId | string
	user?: IUser
	opportunityId: ObjectId | string
	opportunity?: IOpportunity // This is a virtual field
	name: string
	cv: File | string
	linkedin: string
	secondary?: string
	description: string
	status: ApplicationStatus
	createdAt: Date
	updatedAt: Date
	rejectionFeedback?: string
}

type ApplicationStatus =
	| "pending"
	| "forwarded"
	| "interviewing"
	| "offered"
	| "hired"
	| "rejected"
