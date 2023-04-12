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
		title: "Machine Learning Engineer",
		category: "Engineering",
		description: `Dukkantek, a leader in the automated checkout space and a company embracing innovative computer vision technology, is seeking a highly skilled and motivated Machine Learning Engineer to join our dynamic team. We are open to remote candidates, as we believe in providing flexibility and embracing a diverse workforce. As a Machine Learning Engineer at Dukkantek, you will play a crucial role in developing and improving our cutting-edge products.`,
		idealCandidate: `The ideal candidate is based in Europe and holds a Master's degree or PhD in Computer Science, with at least 2 years of experience in machine learning frameworks like TensorFlow and PyTorch, strong programming skills in Python, and knowledge of mathematical and statistical concepts. They should have experience with cloud-based machine learning platforms, familiarity with containerization technologies, and computer vision techniques and libraries.`,
		responsibilities: [
			"Design and maintain machine learning models for object recognition, classification, and tracking",
			"Collaborate with cross-functional teams to integrate machine learning models into production systems",
			"Research latest trends in artificial intelligence, and suggest improvements to existing models ",
			"Develop and maintain documentation for machine learning models and algorithms",
		],
		status: "open",
		perks: {
			items: [
				"Competitive salary and benefits package",
				"Flexibility to work remotely, promoting a healthy work-life balance",
			],
		},
		reward: {
			amount: 5000,
			currency: "USD",
		},
		salary: {
			min: 80000,
			max: 100000,
			currency: "USD",
		},
		location: "Europe",
		remote: true,
		company: {
			name: "Dukkantek",
			about: `Dukkantek enables traditional merchants to compete equally in an evolving digital world, and further empower their retail capacity. Redefining the conventional way of managing tasks and sales, the innovative platform aims to strengthen local community stores and power digital transformations with end-to-end technology that enhances and streamlines all business processes. The company recently announced a $10 million pre-Series A funding round as it powers the digital ecosystem for 13 million SMB retailers across the UAE, Oman, Qatar, Kuwait, Bahrain, Turkey, Saudi Arabia and searches for opportunities in North Africa.`,
			url: "https://www.dukkantek.com/",
			image: "/static/opportunities/dukkantek.png",
			founded: "2021",
			industry: "B2B SaaS",
			employees: "100+",
			stage: "A",
		},
		applications: [],
		applyLink: "https://www.dukkantek.com/careers",
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	res.status(200).json({ data })
}
