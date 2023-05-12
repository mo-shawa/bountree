import { NextApiRequest, NextApiResponse } from "next"
import { checkDuplicateApplicant } from "../../../../../../controllers/application"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, query } = req
	const { id: opportunityId, link } = query

	if (!opportunityId || typeof opportunityId !== "string")
		return res.status(400).json({ error: "Invalid ID" })

	if (!link || typeof link !== "string")
		return res.status(400).json({ error: "Invalid link" })

	try {
		if (method === "GET") {
			const application = await checkDuplicateApplicant(opportunityId, link)
			return res.status(200).json({ application })
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
