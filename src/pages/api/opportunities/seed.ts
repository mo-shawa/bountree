import clientPromise from "../../../../db/connect"
import { NextApiRequest, NextApiResponse } from "next"
import IOpportunity from "@/types/opplortunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)

	if (token?.email?.split("@")[1] !== "bountree.app") {
		return res.status(403).json({ success: false, error: "Forbidden" })
	}

	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)
	const collection = db.collection("opportunities")

	const opportunity: IOpportunity = {
		title: "Senior Copywriter",
		category: "Marketing",
		description: `We are seeking a talented and experienced copywriter to join our marketing team. As a copywriter, you will be responsible for creating compelling, high-quality copy for a variety of mediums including website pages, blog posts, email campaigns, social media, and more. The ideal candidate will have a passion for writing, excellent communication skills, and a strong understanding of the principles of SEO.`,
		idealCandidate: `The ideal candidate lives in Abu Dhabi, or is willing to commute to Abu Dhabi. They should have a degree in marketing, comms, or journalism and have more than 3 years of experience in a marketing agency.`,
		requirements: [
			"3+ years of experience as a copywriter or content writer in a marketing or advertising agency or in-house marketing team.",
			"Strong understanding of the principles of SEO and how search engines rank content.",
			"Excellent writing and communication skills, with the ability to write for a variety of mediums and audiences. ",
			"Ability to conduct research on the product being marketed, the target audience, and the competition.",
		],
		status: "open",
		perks: {
			items: ["Flexible working hours", "Remote work"],
		},
		reward: {
			amount: 3675,
			currency: "USD",
		},
		salary: {
			fixed: 180000,
			currency: "AED",
		},
		location: "Abu Dhabi",
		remote: false,
		company: {
			name: "Krews",
			about: `Krews is a UAE-born social networking platform where users can book, organize,and pay for sports and social events with a network of gyms, personal trainers, sports venues and governing bodies.`,
			url: "https://www.krews.com/",
			image: "/static/opportunities/krews.jpg",
			founded: "2020",
			industry: "Sports Tech",
			employees: "1-5",
			stage: "seed",
		},
		applications: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	return res.status(200).json({ data })
}
