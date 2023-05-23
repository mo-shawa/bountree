import { NextApiRequest, NextApiResponse } from 'next'
import IOpportunity from '@/types/opportunity'
import serverAuthenticate from '@/utils/serverAuthenticate'
import { Timestamp } from 'firebase-admin/firestore'
import { createOpportunity } from '../../../../controllers/opportunity'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req)

	if (token?.email?.split('@')[1] !== 'bountree.app') {
		return res.status(403).json({ success: false, error: 'Forbidden' })
	}

	const opportunity: IOpportunity = {
		title: 'Client Experience Manager',
		category: 'Operations',
		description: `Our Client Experience Manager will be an integral part of our Product team, playing a key role in not only attracting, acquiring, converting and retaining investors but also in leveraging generative AI technologies to streamline our customer support services. This critical role will collect and champion the 'Voice of our Customer' internally and ensure our Clients are always engaged when needed, and that we're leveraging our internal customer communications tool (Intercom) and CRM system (Salesforce) to its maximum potential.`,
		idealCandidate: `The ideal candidate will act as the product owner for our customer communications tools. They'll speaks English and Arabic fluently. They'd have experience with Salesforce and Intercom. Knowing how to use AI tools to automate CRMs is a major plus.`,
		requirements: [
			'4+ years in a Client Experience, or Relationship Management',
			'2+ years experience in a funded start-up',
			'Familiarity automated customer support systems, and their integration with CRMs and communication tools',
			'English and Arabic speaking',
		],
		status: 'open',
		perks: {
			items: [
				'A competitive salary and package with employee stock options.',
				'Health insurance, paid time off and a hybrid work environment.',
			],
		},
		reward: {
			amount: 2500,
			currency: 'USD',
		},
		salary: {
			min: 204000,
			max: 216000,
			currency: 'AED',
		},
		location: 'Dubai',
		remote: false,
		company: {
			name: 'Stake',
			about: `Stake is the MENA region's leading real estate fintech company, combining real estate expertise and innovative financial technology to deliver products that empower everyone to own and build wealth through Real Estate. Launched in 2021 we have grown rapidly, to a team of over 50 people leveraging decades of experience in technology, financial services and global real estate, to support over 150,000 users with over AED 150 million in AUM already.`,
			url: 'https://getstake.com/',
			image: '/static/opportunities/stake.jpg',
			founded: '2021',
			industry: 'Real Estate',
			employees: '50+',
			stage: 'A',
		},
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now(),
	}

	const createdOpportunity = await createOpportunity(opportunity)

	return res.status(200).json({ createdOpportunity })
}
