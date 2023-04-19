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
		title: "ERP Python Developer",
		category: "Engineering",
		description: `We are looking for a talented and motivated ERP Full Stack Python Developer to join our ERP team.  You will work with a small and talented team with a passion to build a digital car-buying experience for the Saudi Arabia market.`,
		idealCandidate: `Based in Jordan. Motivated ERP Full Stack Python Developer with 3+ years of Python experience, proven experience in ERP platforms, and familiarity with Frappe framework. Must have experience in Mysql/MariaDB and working with APIs. Experience as a team lead with excellent problem-solving skills and attention to detail. Passionate about building a digital car-buying experience for the Saudi Arabia market.`,
		responsibilities: [
			"3 years of experience in Python",
			"Experience in Frappe framework",
			"Experience in ERP platforms (ERPNext, Odoo)",
			"Proven experience in Mysql/MariaDB",
			"Experience working with APIs, including SOAP or REST",
		],
		status: "open",
		perks: {
			items: [],
		},
		reward: {
			amount: 2000,
			currency: "USD",
		},
		salary: {
			fixed: 24000,
			currency: "JOD",
		},
		location: "Jordan",
		remote: false,
		company: {
			name: "Syarah",
			about: `Syarah.com is a dynamic and ambitious startup with a mission to disrupt the automotive industry in Saudi Arabia and the rest of GCC to offer an easy and outstanding digital car-buying experience with hassle-free processes and car delivery to the customer's doorstep.`,
			url: "https://syarah.com",
			image: "/static/opportunities/syara.jpg",
			founded: "2015",
			industry: "Automotive",
			employees: "380+",
			stage: "B",
		},
		applications: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	res.status(200).json({ data })
}
