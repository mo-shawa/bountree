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
		title: "Data Engineer",
		category: "Engineering",
		description: `We are looking for someone with experience in designing, building, and maintaining data pipelines and our data lake. As a data engineer, you will be involved in all aspects of data collection, cleaning, and processing, ensuring the quality and availability of data. You will collaborate closely with data scientists, platform, and front-end engineers, defining requirements and designing new data processes, as well as maintaining and improving existing ones. We are looking for someone who is passionate about high-quality data and understands the impact they have in solving real-life problems. Being proactive in identifying issues, digging deep into their source, and developing solutions, are at the heart of this role. `,
		idealCandidate: `The ideal candidate should have experience with AWS, Kubernetes, distributed computing frameworks like Spark, and data warehousing, as well as the ability to debug complex ETL issues. They should also be familiar with Agile Scrum and have a basic understanding of routing, switching, and network communication protocols. Experience with small to mid-sized software development projects is preferred.`,
		responsibilities: [
			"Strong Python programming experience",
			"3-5 years data engineering experience",
			"Experience with data pipelines, SQL & various databases",
			"Good knowledge of Spark and distributed computing frameworks",
			"Bachelor's degree in CS, CE, EE or equivalent experience",
		],
		status: "open",
		perks: {
			items: ["A competitive salary and package with employee stock options."],
		},
		reward: {
			amount: 3000,
			currency: "USD",
		},
		salary: {
			min: 55000,
			max: 65000,
			currency: "USD",
		},
		location: "Remote",
		remote: true,
		company: {
			name: "CoinMENA",
			about: `CoinMENA is the fastest-growing cryptocurrency exchange in the MENA region. We are licensed by the Central Bank of Bahrain and in the European Union. Our mission is to be the easiest and safest way to onboard people to crypto, but that's not all. At CoinMENA we believe that crypto is the future of finance. We are building a more equitable financial system where anyone with an internet connection can have access to premium financial services and investments.`,
			url: "https://www.coinmena.com",
			image: "/static/opportunities/coin-mena.png",
			founded: "2021",
			industry: "Crypto",
			employees: "40+",
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
