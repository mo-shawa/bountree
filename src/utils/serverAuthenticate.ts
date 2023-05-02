import { getToken } from "next-auth/jwt"
import type { NextApiRequest } from "next"

export default async function serverAuthenticate(req: NextApiRequest) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET })
	return { token }
}
