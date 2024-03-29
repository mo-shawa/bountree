import type { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { acceptTOS } from "@/controllers/user"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = await serverAuthenticate(req)
  const { id } = req.query
  const { method } = req

  if (!token) return res.status(401).json({ 401: "Unauthorized" })

  if (!id || typeof id !== "string")
    return res.status(400).json({ error: "Invalid ID" })

  try {
    if (method === "PUT") {
      const user = await acceptTOS(id)

      return res.status(200).json({ user })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}
