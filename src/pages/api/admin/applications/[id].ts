import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { updateApplicationStatus } from "../../../../../controllers/application"
import { sendCandidateUpdateEmail } from "@/utils/email"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)
	const { method } = req

	if (token?.email?.split("@")[1] !== "bountree.app") {
		res.status(403).json({ error: "Forbidden" })
		return
	}
	try {
		if (method === "PUT") {
			const parsedBody = JSON.parse(req.body)

			const {
				status,
				userEmail,
				userName,
				candidateName,
				positionName,
				startupName,
				reason,
			} = parsedBody

			const { id } = req.query

			const updatedApplication = await updateApplicationStatus(
				id as string,
				status
			)

			const sendGridResponse = await sendCandidateUpdateEmail({
				userName,
				userEmail,
				candidateName,
				positionName,
				startupName,
				status,
				reason,
			})

			res.status(200).json({ updatedApplication, sendGridResponse })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
