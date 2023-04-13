import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { getOpportunities } from "../../../../controllers/opportunity"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await serverAuthenticate(req, res)

		const { method } = req

		if (method === "GET") {
			const opportunities = await getOpportunities()
			res.status(200).json({ success: true, data: opportunities })
		}
	} catch (error) {
		res.status(400).json({ success: false, error })
	}
}
