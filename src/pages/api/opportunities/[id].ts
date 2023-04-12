import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../../db/connect"
import { ObjectId } from "mongodb"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)

	const { method, query } = req
	const { id } = query

	console.log({ id, method, query })

	if (method === "GET") {
		if (!id || typeof id !== "string")
			return res.status(400).json({ error: "Invalid ID" })

		const client = await clientPromise
		const db = client.db("bountree-dev")

		const opportunity = await db
			.collection("opportunities")
			.findOne({ _id: new ObjectId(id) })

		console.log({ opportunity })

		res.status(200).json({ opportunity })
	}
}
