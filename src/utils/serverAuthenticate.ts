import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function serverAuthenticate(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })

	if (!session?.user?.email)
		return res.status(401).json({ 401: "Unauthorized" })

	return session
}
