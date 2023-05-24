import IApplication from './application'
import { Timestamp } from 'firebase-admin/firestore'
import ICompany from './company'

export default interface IOpportunity {
	id?: string
	title: string
	category: 'Engineering' | 'Product' | 'Marketing' | 'Operations' | 'Legal'
	description: string
	idealCandidate: string
	requirements: string[]
	status: OpportunityStatus
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
	company: ICompany
	rejectionFeedback?: Feedback[]
	badge?: {
		type:
			| 'red'
			| 'orange'
			| 'yellow'
			| 'green'
			| 'blue'
			| 'indigo'
			| 'purple'
			| 'pink'
		text: string
	}
	applications?: IApplication[]
	createdAt: Timestamp
	updatedAt: Timestamp
}

type OpportunityStatus = 'open' | 'closed' | 'paused'

type Feedback = {
	application: string
	date: Date
	content: string
}
