import { Configuration, OpenAIApi } from "openai"
import { NextApiRequest, NextApiResponse } from "next"

const configuration = new Configuration({
	organization: "org-uLiuLoOSQPQRPeb7UPbSIaUV",
	apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const openai = new OpenAIApi(configuration)
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content:
					"Generate a job description for a lead software engineer with the following sections: job title, job description, ideal candidate, requirements, and perks.",
			},
		],
	})
	console.log(response)

	res.status(200).json(response.data)
}
