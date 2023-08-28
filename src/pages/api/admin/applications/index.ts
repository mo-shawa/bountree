import { NextApiRequest, NextApiResponse } from "next"
import { getAdminApplications } from "@/controllers/application"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = await serverAuthenticate(req)
    const { method } = req

    if (method === "GET") {
      if (token?.email?.split("@")[1] !== "bountree.app") {
        return res.status(403).json({ error: "Forbidden" })
      }

      const applications = await getAdminApplications()
      return res.status(200).json({ applications })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}
