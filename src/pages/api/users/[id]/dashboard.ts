import type { NextApiRequest, NextApiResponse } from "next"
import { getApplications } from "../../../../../controllers/application"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { id },
	} = req

	if (!id || typeof id !== "string") {
		res.status(400).json({ error: "Missing id" })
		return
	}

	const opportunities = await getApplications()

	res.status(200).json({ opportunities })
}
