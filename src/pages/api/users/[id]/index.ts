import type { NextApiRequest, NextApiResponse } from 'next'
import serverAuthenticate from '@/utils/serverAuthenticate'
import { getUser, updateUser } from '../../../../../controllers/user'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// ...
	const { session } = await serverAuthenticate(req, res)
	const { id } = req.query
	const { method } = req

	if (session?.user.id !== id) {
		return res.status(401).json({ 401: 'Unauthorized' })
	}

	if (!id || typeof id !== 'string')
		return res.status(400).json({ error: 'Invalid ID' })

	try {
		if (method === 'GET') {
			const user = await getUser(id)
			res.status(200).json({ user })
		}
	} catch (error) {}
}
