import clientPromise from "../../../../db/connect"
import { NextApiRequest, NextApiResponse } from "next"
import IOpportunity from "@/types/opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req)

	if (token?.email?.split("@")[1] !== "bountree.app") {
		return res.status(403).json({ success: false, error: "Forbidden" })
	}

	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)
	const collection = db.collection("opportunities")

	const opportunity: IOpportunity = {
		title: "Head of Marketing",
		category: "Marketing",
		description: `As the Head of Marketing, you will be responsible for developing and executing the company's overall marketing strategy to drive revenue growth, increase brand awareness, and promote customer retention. You will lead a team of marketing professionals and work closely with cross-functional teams to ensure alignment of marketing efforts with the company's overall objectives.`,
		idealCandidate: `The ideal candidate would possess strategic thinking, creativity, leadership skills, and a proven track record of successful marketing strategies. They would be experienced in developing marketing campaigns, managing websites and creating content. They would build relationships with influencers, analyse marketing metrics, collaborate with teams and manage the marketing budget to achieve maximum ROI.`,
		requirements: [
			"Bachelor’s Degree in Marketing, Business, or a related field",
			"7+ years of experience in marketing, with at least 2 years of experience in a leadership role",
			"Proficiency in English is mandatory with excellent written and verbal communication skills",
			"Experience in working in in high octane startup environments (SaaS experience preferred)",
			"Willingness to embrace change and adapt strategies accordingly",
			"Knowledge of market trends and habits of market demographic",
			"In-depth knowledge of brand building and distribution channels",
			"Experience of developing and implementing a digital strategy and operational plan",
			"Strong analytical skills and the ability to use data to drive decision-making",
		],
		status: "open",
		perks: {
			items: ["A competitive salary and package with employee stock options."],
		},
		reward: {
			amount: 8000,
			currency: "USD",
		},
		salary: {
			min: 480000,
			max: 600000,
			currency: "AED",
		},
		location: "Dubai",
		remote: false,
		company: {
			name: "Clara",
			about: `Clara is the LegalOS for startups everywhere. Clara's integrated set of self-service tools help founders digitally form, manage, and scale their startups allowing them to do everything from creating and signing agreements to managing cap tables and structuring data rooms.`,
			url: "https://clara.co/",
			image: "/static/opportunities/clara.jpg",
			founded: "2018",
			industry: "Legal",
			employees: "40+",
			stage: "A",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	return res.status(200).json({ data })
}
