import { getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function serverAuthenticate(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })
	const token = await getToken({ req, secret: process.env.JWT_SECRET })

	if (!session?.user?.email && !token?.email) {
		return { session: null, token: null }
	}

	return { session, token }
}
