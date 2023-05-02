import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import IApplication from "@/types/application"
import { createApplication } from "../../../../controllers/application"
import { getOpportunityById } from "../../../../controllers/opportunity"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req)
	if (!token) return res.status(401).json({ error: "Unauthorized" })

	const { method } = req

	try {
		if (method === "POST") {
			const parsedBody = JSON.parse(req.body)

			const application: IApplication = {
				...parsedBody,
				status: "pending",
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			const newApplication = await createApplication(application)

			const opportunity = await getOpportunityById(parsedBody.opportunityId)
			return res.status(200).json({ opportunity })
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
