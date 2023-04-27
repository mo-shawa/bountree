import { NextApiRequest, NextApiResponse } from "next"
import { getAdminUsers } from "../../../../controllers/user"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req, res)
	const { method } = req

	try {
		if (method === "GET") {
			if (token?.email?.split("@")[1] !== "bountree.app") {
				res.status(403).json({ error: "Forbidden" })
				return
			}

			const users = await getAdminUsers()
			res.status(200).json({ users })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
