import clientPromise from '../../../../db/connect'
import { NextApiRequest, NextApiResponse } from 'next'
import IOpportunity from '@/types/Opportunity'
import serverAuthenticate from '@/utils/serverAuthenticate'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)

	const client = await clientPromise
	const db = client.db('bountree-dev')
	const collection = db.collection('opportunities')

	const opportunity: IOpportunity = {
		title: 'UX Researcher',
		category: 'Engineering',
		description: `We're seeking a skilled User Researcher to conduct and oversee user recruitment, test moderation, analysis and reporting. You'll conduct research to gather insights for new product developments, and create user journey maps and personas to enhance organizational understanding of users. Working closely with designers and developers, you'll translate user data into actionable product requirements that will influence product direction. Additionally, you'll present findings and design/business recommendations to senior decision-makers, and work with leadership to devise appropriate research strategies. `,
		idealCandidate: `The ideal candidate has 5 years of experience planning and conducting usability testing sessions, developing UX artefacts, and analyzing qualitative and quantitative data. A degree in HCI, Cognitive Science, Psychology, Anthropology, or a related field is preferred. Strong communication skills are essential as you'll be working with senior stakeholders to advocate for user needs.`,
		responsibilities: [
			'At least 5 years experience as a User Researcher',
			'Able to effectively communicate user needs to senior stakeholders and acting as a persuasive advocate for those needs',
			'Considerable experience of conducting user interviews',
			'Considerable experience analysing both quantitative and qualitative data to produce UX artefacts',
			'Previous experience of managing, planning, and designing',
			'Considerable experience of developing and conducting usability testing sessions',
		],
		status: 'open',
		perks: {
			items: ['A competitive salary and package with employee stock options.'],
		},
		reward: {
			amount: 5500,
			currency: 'USD',
		},
		salary: {
			min: 240000,
			max: 300000,
			currency: 'AED',
		},
		location: 'Dubai',
		remote: false,
		company: {
			name: 'Clara',
			about: `Clara is a mission-driven company aiming to build a meaningful product that will come to be viewed as an integral part of every startup's software stack. Clara makes it easier for anyone to start a company, regardless of where they are based. We are lowering the barriers to entry for founders everywhere because we believe the world will be a better place if it's filled with more founder-led companies and employee-owners.`,
			url: 'www.clara.co',
			image: '/static/opportunities/clara.jpg',
			founded: '2018',
			industry: 'Legal',
			employees: '40+',
			stage: 'A',
		},
		applications: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	res.status(200).json({ data })
}
