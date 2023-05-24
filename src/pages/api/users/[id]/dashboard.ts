import type { NextApiRequest, NextApiResponse } from 'next'
import { getApplicationsByUser } from '../../../../../controllers/application'
import serverAuthenticate from '@/utils/serverAuthenticate'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = await serverAuthenticate(req)
	if (!token) return res.status(401).json({ error: 'Unauthorized' })

	const {
		query: { id },
	} = req

	if (!id || typeof id !== 'string') {
		return res.status(400).json({ error: 'Missing id' })
	}

	const applications = await getApplicationsByUser(id)

	return res.status(200).json({ applications })
}
