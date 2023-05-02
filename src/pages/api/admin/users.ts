import { NextApiRequest, NextApiResponse } from "next"
import { getAdminUsers } from "../../../../controllers/user"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req)
	const { method } = req

	try {
		if (method === "GET") {
			if (token?.email?.split("@")[1] !== "bountree.app") {
				return res.status(403).json({ error: "Forbidden" })
			}

			const users = await getAdminUsers()
			return res.status(200).json({ users })
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
