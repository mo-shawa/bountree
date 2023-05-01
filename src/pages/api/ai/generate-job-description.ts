import { Configuration, OpenAIApi } from "openai"
import { NextApiRequest, NextApiResponse } from "next"
import { addEmailAddress } from "../../../../controllers/leads"
import { checkEmailListForUser } from "../../../../controllers/leads"
import { sendJobGeneratorEmail } from "@/utils/email"

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

		const funTones = ["Surfer", "Playful", "Sarcastic", "Old English"]

		const openai = new OpenAIApi(configuration)
		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Generate a job description for a ${jobTitle} with the following sections: job title, job description, ideal candidate, requirements, and perks. The tone of the posting should be ${tone}.${
						funTones.includes(tone as string)
							? "Really exaggerate. Play up the tone and use plenty of emojis to emphasize the tone selected"
							: ""
					}`,
				},
			],
		})

		const jobDescription: string | undefined =
			response.data.choices[0].message?.content
		const formattedJD: string = jobDescription!.replaceAll("\r?\n", "<br/>")
		console.log({ jobDescription, formattedJD })

		// save email for marketing
		const foundUser = await checkEmailListForUser(email as string)
		if (!foundUser) {
			await addEmailAddress(email as string)
		}
		await sendJobGeneratorEmail(email as string, formattedJD)
		return res.status(200).json(response.data)
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message })
	}
}
