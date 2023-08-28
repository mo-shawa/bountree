import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { getOpportunities } from "@/controllers/opportunity"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = await serverAuthenticate(req)
    if (!token) return res.status(401).json({ error: "Unauthorized" })
    const { method } = req

    if (method === "GET") {
      const opportunities = await getOpportunities()
      return res.status(200).json({ success: true, data: opportunities })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
