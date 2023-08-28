// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import serverAuthenticate from "@/utils/serverAuthenticate"
import { sendCandidateUpdateEmail } from "@/utils/email"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = await serverAuthenticate(req)

  if (!token) return res.status(401).json({ error: "Unauthorized" })

  const response = await sendCandidateUpdateEmail({
    userName: "test name",
    userEmail: "moshawa0@gmail.com",
    candidateName: "test candidate name",
    positionName: "test position name",
    startupName: "test startup name",
    status: "hired",
  })

  return res.status(200).json({ name: "nice", token, response })
}
