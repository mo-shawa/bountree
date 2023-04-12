import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../../db/connect"
import { createOpportunity } from "../../../../db/opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	await serverAuthenticate(req, res)

	const client = await clientPromise
	const db = client.db("bountree-dev")

	console.log({ req })

	const opportunity = await createOpportunity(db, {
		title: "Test Opportunity",
		description: "This is a test opportunity",
		category: "Test",
		status: "open",
		reward: {
			amount: 100,
			currency: "USD",
		},
		salary: {
			min: 100,
			max: 100,
			currency: "USD",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
		location: "Test",
		remote: false,
		company: {
			name: "Test",
			url: "https://via.placeholder.com/80",
			image: "Test",
			slogan: "Test",
		},
		contact: {
			name: "Test",
			email: "Test",
			phone: "Test",
			image: "Test",
		},
		links: {
			apply: "Test",
			website: "Test",
		},
		recruiters: [],
	})

	console.log({ opportunity })

	res.status(200).json({ opportunity })
}
