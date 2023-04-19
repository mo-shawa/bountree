import type { Document, ObjectId } from "mongodb"

export default interface IApplication extends Document {
	_id?: ObjectId | string
	userId: ObjectId | string
	opportunityId: ObjectId | string
	name: string
	cv: File | string
	linkedin: string
	secondary?: string
	description: string
	status: "pending" | "interviewing" | "rejected" | "hired"
	createdAt: Date
	updatedAt: Date
}
