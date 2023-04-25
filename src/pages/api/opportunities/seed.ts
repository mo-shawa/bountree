import clientPromise from "../../../../db/connect"
import { NextApiRequest, NextApiResponse } from "next"
import IOpportunity from "@/types/Opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)

	const client = await clientPromise
	const db = client.db("bountree-dev")
	const collection = db.collection("opportunities")

	const opportunity: IOpportunity = {
		title: "Client onboarding and management lead",
		category: "Legal",
		description: `Are you a client onboarding expert looking to take the next step in your career? We're seeking a talented individual to join our team as a Client Onboarding and Management Lead. As the lead, you will be responsible for managing and overseeing the entire onboarding process, ensuring a smooth and efficient experience for our clients.`,
		idealCandidate: `The ideal candidate speaks Arabic, has a strong background in customer service with a particular focus on working with angel investors. Previous startup experience is a plus.`,
		requirements: [
			"Bachelor's degree in business administration, finance, or related field",
			"Minimum 3-5 years of experience in a similar role, preferably with experience in dealing with angel investors",
			"Excellent communication skills, both verbal and written",
		],
		status: "open",
		perks: {
			items: ["Flexible working hours", "Remote work"],
		},
		reward: {
			amount: 2925,
			currency: "USD",
		},
		salary: {
			fixed: 39000,
			currency: "USD",
		},
		location: "Jordan",
		remote: true,
		company: {
			name: "Zest Equity",
			about: `Zest is on a mission to democratize access to venture, empowering investors, founders and their companies on one platform.`,
			url: "https://zestequity.com/",
			image: "/static/opportunities/zest.png",
			founded: "2021",
			industry: "Investment",
			employees: "10+",
			stage: "seed",
		},
		applications: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	res.status(200).json({ data })
}
