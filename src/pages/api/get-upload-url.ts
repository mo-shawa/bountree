import {
	GenerateSignedPostPolicyV4Options,
	Storage,
} from "@google-cloud/storage"
import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { private_key } = JSON.parse(process.env.PRIVATE_KEY as string)

	const storage = new Storage({
		projectId: process.env.PROJECT_ID,
		credentials: {
			client_email: process.env.CLIENT_EMAIL,
			private_key: private_key,
		},
	})

	const fileName = randomUUID() + "_" + req.query.file!

	const bucket = storage.bucket(process.env.BUCKET_NAME as string)
	const file = bucket.file(fileName)
	const options: GenerateSignedPostPolicyV4Options = {
		expires: Date.now() + 1 * 60 * 1000, //  1 minute,
		fields: { "x-goog-meta-test": "data" },
	}

	const signed = await file.generateSignedPostPolicyV4(options)
	const [response] = signed
	res.status(200).json({ ...response, fileName })
}
