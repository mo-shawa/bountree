import { Configuration, OpenAIApi } from "openai"
import { NextApiRequest, NextApiResponse } from "next"
import { addEmailAddress } from "../../../../controllers/leads"

const configuration = new Configuration({
	organization: "org-uLiuLoOSQPQRPeb7UPbSIaUV",
	apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req

	if (method !== "GET") {
		return res.status(405).json({ success: false, error: "Method not allowed" })
	}

	try {
		const { jobTitle, tone, email } = query

		const openai = new OpenAIApi(configuration)
		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Generate a job description for a ${jobTitle} with the following sections: job title, job description, ideal candidate, requirements, and perks. The tone of the posting should be ${tone}.`,
				},
			],
		})
		console.log(response)

		// save email for marketing
		await addEmailAddress(email as string)

		res.status(200).json(response.data)
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message })
	}
}
