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
	const response = await openai.listEngines()
	console.log(response)

	res.status(200).json(response.data)
}
