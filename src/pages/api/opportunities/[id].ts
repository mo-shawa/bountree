import { NextApiRequest, NextApiResponse } from "next"
import { getOpportunityById } from "../../../../controllers/opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await serverAuthenticate(req, res)

		const { method, query } = req
		const { id } = query

		if (method === "GET") {
			if (!id || typeof id !== "string")
				return res.status(400).json({ error: "Invalid ID" })

			const opportunity = await getOpportunityById(id)

			res.status(200).json({ opportunity })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
