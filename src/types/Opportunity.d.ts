import type { ObjectId } from "mongodb"
import type { Document } from "mongodb"

export default interface IOpportunity extends Document {
	title: string
	category: string
	description: string
	idealCandidate: string
	responsibilities: string[]
	status: Status
	perks: {
		description?: string
		items: string[]
	}
	reward: {
		amount: number
		currency: string
	}
	salary: {
		min?: number
		max?: number
		fixed?: number // if not fixed, then min and max are used
		currency: string
	}
	location: string
	remote: boolean
	company: Company
	rejectionFeedback?: Feedback[]
	applications: Application[]
	createdAt: Date
	updatedAt: Date
}

type Status = "open" | "closed" | "paused"

type company = {
	name: string
	about: string
	url: string
	image: string
	founded: Date
	industry?: string
	employees?: string
	stage:
		| "preseed"
		| "seed"
		| "A"
		| "B"
		| "C"
		| "D"
		| "E"
		| "F"
		| "IPO"
		| "acquired"
		| "growth"
}

export type Application = {
	_id?: ObjectId | string
	name: string
	cv: File | string
	recruiter: ObjectId | string
	linkedin: string
	secondary?: string
	description: string
	createdAt?: Date
	updatedAt?: Date
}

type Feedback = {
	application: ObjectId | string
	date: Date
	content: string
}
