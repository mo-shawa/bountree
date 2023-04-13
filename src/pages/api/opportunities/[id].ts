import { NextApiRequest, NextApiResponse } from 'next'
import {
	getOpportunityById,
	addApplicationToOpportunity,
} from '../../../../controllers/opportunity'
import serverAuthenticate from '@/utils/serverAuthenticate'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)
	const { method, query } = req
	const { id } = query
	if (!id || typeof id !== 'string')
		return res.status(400).json({ error: 'Invalid ID' })

	try {
		if (method === 'GET') {
			const opportunity = await getOpportunityById(id)

			res.status(200).json({ opportunity })
		}

		if (method === 'POST') {
			const updatedOpportunity = await addApplicationToOpportunity(id, req.body)
			console.log({ updatedOpportunity })
			// @ts-ignore
			if (!updatedOpportunity.value._id) throw new Error()
			res.status(200).json({ opportunity: updatedOpportunity })
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}
