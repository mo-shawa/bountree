import type { Document, ObjectId } from "mongodb"
import IOpportunity from "./Opportunity"
import IUser from "./User"

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
	status: "pending" | "interviewing" | "rejected" | "hired"
	createdAt: Date
	updatedAt: Date
}
