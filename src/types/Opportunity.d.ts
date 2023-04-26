import type { ObjectId, Document } from "mongodb"
import IApplication from "./Application"

export default interface IOpportunity extends Document {
	title: string
	category: "Engineering" | "Product" | "Marketing" | "Operations" | "Legal"
	description: string
	idealCandidate: string
	requirements: string[]
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
	applications: IApplication[]
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

type Feedback = {
	application: ObjectId | string
	date: Date
	content: string
}
