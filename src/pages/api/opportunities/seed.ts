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
		title: "Investment Associate",
		category: "Operations",
		description: `Khwarizmi Ventures (KV) is a Saudi-based early stage VC with a vision to be the leading Venture Capital fund in the MENA region, with an oversubscribed fund of $70m from high-profile LPs in the region. Our team hails from a variety of backgrounds with a passion for the startup and venture ecosystem. We provide a rigorous and hands-on experience of the VC world through exposure to live deals across varied stages and industries.`,
		idealCandidate: `The ideal candidate has experience working for VCs in the UAE, KSA, UAS or Europe. They've got 3-6 years of experience working in a VC, startup, consulting, or investment banking.`,
		requirements: [
			"3 - 6 years of experience",
			"Bachelor's degree with outstanding academic record",
			"A previous job/internship in a VC, startup, consulting, or investment banking is a plus",
			"M&A / financial models / valuation analysis",
			"Excellent understanding of regional and global economics",
			"Excellent analytical skills with M&A / financial models / valuation analysis",
		],
		status: "open",
		perks: {
			items: ["Annual bonus", "% of investment carry"],
		},
		reward: {
			amount: 2000,
			currency: "USD",
		},
		salary: {
			min: 36000,
			max: 72000,
			currency: "USD",
		},
		location: "Riyadh",
		remote: false,
		company: {
			name: "Khwarizmi Ventures",
			about: `Khwarizmi Ventures is a Saudi-based Venture Capital fund investing in early-stage startups in the MENA region. Ever since its launch in 2018, Khwarizmi has seed-funded notable startups, assisted various founders, and scaled multiple regional companies.`,
			url: "https://www.khwarizmivc.com/",
			image: "/static/opportunities/khwarizmi.jpg",
			founded: "2018",
			industry: "Venture Capital",
			employees: "10+",
			stage: "growth",
		},
		applications: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const data = await collection.insertOne(opportunity)

	return res.status(200).json({ data })
}
