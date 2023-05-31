import { NextApiRequest, NextApiResponse } from 'next'
import { getLatestOpportunities } from '../../../../controllers/opportunity'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { method } = req

		if (method === 'GET') {
			const opportunities = await getLatestOpportunities()
			return res.status(200).json({ success: true, data: opportunities })
		}
	} catch (error) {
		return res.status(400).json({ success: false, error })
	}
}
