import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../../db/connect"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)

	const { method } = req
	const client = await clientPromise
	const db = client.db("bountree-dev")

	if (method === "GET") {
		try {
			const opportunities = await db
				.collection("opportunities")
				.find({})
				.toArray()
			res.status(200).json({ success: true, data: opportunities })
		} catch (error) {
			res.status(400).json({ success: false, error })
		}
	}
}
