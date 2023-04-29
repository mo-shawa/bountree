import { NextApiRequest, NextApiResponse } from "next"
import { getAdminApplications } from "../../../../controllers/application"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { updateApplicationStatus } from "../../../../controllers/application"
import { sendCandidateUpdateEmail } from "@/utils/email"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)
	const { method } = req

	try {
		if (method === "GET") {
			if (token?.email?.split("@")[1] !== "bountree.app") {
				res.status(403).json({ error: "Forbidden" })
				return
			}

			const applications = await getAdminApplications()
			res.status(200).json({ applications })
		}

		if (method === "PUT") {
			const parsedBody = JSON.parse(req.body)
			const { id, status } = parsedBody

			const updatedApplication = await updateApplicationStatus(id, status)

			res.status(200).json({ updatedApplication })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
