import { NextApiRequest, NextApiResponse } from "next"
import { checkDuplicateApplicant } from "../../../../../../../controllers/application"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, query } = req
	const { id: opportunityId, linkedIn, candidateEmail } = query

	if (!opportunityId || typeof opportunityId !== "string")
		return res.status(400).json({ error: "Invalid ID" })

	if (!linkedIn || typeof linkedIn !== "string")
		return res.status(400).json({ error: "Invalid linkedIn" })

	if (!candidateEmail || typeof candidateEmail !== "string") {
		return res.status(400).json({ error: "Invalid email" })
	}

	try {
		if (method === "GET") {
			const application = await checkDuplicateApplicant(
				opportunityId,
				linkedIn,
				candidateEmail
			)
			return res.status(200).json({ application })
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
