import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import IApplication from "@/types/Application"
import { createApplication } from "../../../../controllers/application"
import { getOpportunityById } from "../../../../controllers/opportunity"
import sgMail from "@sendgrid/mail"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)
	const { method } = req

	try {
		if (method === "POST") {
			const parsedBody = JSON.parse(req.body)

			sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
			const msg = {
				to: "mahmoud@shawa.dev", // Change to your recipient
				from: "ms@bountree.app", // Change to your verified sender
				subject: "Sending with SendGrid is Fun",
				text: "and easy to do anywhere, even with Node.js",
				html: "<strong>and easy to do anywhere, even with Node.js</strong>",
			}
			sgMail
				.send(msg)
				.then(() => {
					console.log("Email sent")
				})
				.catch((error) => {
					console.error(error)
				})

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
