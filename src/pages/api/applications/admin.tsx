import { NextApiRequest, NextApiResponse } from "next"
import { getAdminApplications } from "../../../../controllers/application"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)
	const { method } = req

	try {
		if (method === "GET") {
			if (token?.email?.split("@")[1] !== "bountree.app") {
				res.status(401).json({ error: "Unauthorized" })
				return
			}

			const applications = await getAdminApplications()
			res.status(200).json({ applications })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
