import { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { Application, ApplicationWithout_Id } from "@/types/application"
import { createApplication } from "@/controllers/application"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = await serverAuthenticate(req)
  if (!token) return res.status(401).json({ error: "Unauthorized" })

  const { method } = req

  try {
    if (method === "POST") {
      const parsedBody = JSON.parse(req.body)

      const application: ApplicationWithout_Id = {
        ...parsedBody,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const newApplication: Application = await createApplication(application)

      return res.status(200).json({ newApplication })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}
