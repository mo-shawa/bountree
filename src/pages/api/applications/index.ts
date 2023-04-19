import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import IApplication from "@/types/Application"
import { createApplication } from "../../../../controllers/application"
import { getOpportunityById } from "../../../../controllers/opportunity"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)
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
			res.status(200).json({ opportunity })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
