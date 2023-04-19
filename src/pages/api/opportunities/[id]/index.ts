import { NextApiRequest, NextApiResponse } from "next"
import {
	getOpportunityById,
	addApplicationToOpportunity,
} from "../../../../../controllers/opportunity"
import { addApplicationToUser } from "../../../../../controllers/user"
import serverAuthenticate from "@/utils/serverAuthenticate"
import type { RecruiterOpportunity } from "@/types/User"
import { ObjectId } from "mongodb"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)
	const { method, query } = req
	const { id } = query
	if (!id || typeof id !== "string")
		return res.status(400).json({ error: "Invalid ID" })

	try {
		if (method === "GET") {
			const opportunity = await getOpportunityById(id)

			res.status(200).json({ opportunity })
		}

		if (method === "POST") {
			const { updatedOpportunity, applicationId } =
				await addApplicationToOpportunity(id, req.body)

			if (!updatedOpportunity.value._id) throw new Error()

			// add application id to user
			const recruiterOpportunity: RecruiterOpportunity = {
				_id: new ObjectId(),
				opportunityId: updatedOpportunity.value._id,
				applicationId: applicationId,
				status: "pending",
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			await addApplicationToUser(token?.sub!, recruiterOpportunity)

			res.status(200).json({ opportunity: updatedOpportunity })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
