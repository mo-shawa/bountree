import { NextApiRequest, NextApiResponse } from "next"
import { getOpportunityById } from "../../../../../controllers/opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req)
	if (!token) return res.status(401).json({ error: "Unauthorized" })

	const { method, query } = req
	const { id: opportunityId } = query

	if (!opportunityId || typeof opportunityId !== "string")
		return res.status(400).json({ error: "Invalid ID" })

	try {
		if (method === "GET") {
			const opportunity = await getOpportunityById(opportunityId)
			return res.status(200).json({ opportunity })
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
