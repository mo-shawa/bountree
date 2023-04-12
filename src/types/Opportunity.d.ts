import type { ObjectId } from "mongodb"
import type { Document } from "mongodb"

export default interface IOpportunity extends Document {
	title: string
	category: string
	description: string
	status: Status
	perks: {
		description: string
		items: string[]
	}
	reward: {
		amount: number
		currency: string
	}
	salary: {
		min: number
		max: number
		currency: string
	}
	location: string
	remote: boolean
	company: Company
	contact: Contact
	applyLink: string
	rejectionFeedback: Feedback[]
	recruiters: string[]
	createdAt: Date
	updatedAt: Date
}

type Status = "open" | "closed" | "archived"

type company = {
	name: string
	about: string
	slogan: string
	url: string
	image: string
	industry: string
	size: number
}

type Contact = {
	name: string
	image: string
	email: string
	phone: string
}

type Feedback = {
	date: Date
	content: string
}
