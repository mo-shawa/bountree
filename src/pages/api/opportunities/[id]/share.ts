import { NextApiRequest, NextApiResponse } from "next"
import { getOpportunityById } from "@/controllers/opportunity"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req
  const { id: opportunityId } = query

  if (!opportunityId || typeof opportunityId !== "string")
    return res.status(400).json({ error: "Invalid ID" })

  try {
    if (method === "GET") {
      const opportunity = await getOpportunityById(opportunityId)
      return res.status(200).json({ opportunity })
    }

    return res.status(405).json({ error: "Method not allowed" })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
