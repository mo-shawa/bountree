import clientPromise from "../../../../db/connect"
import { NextApiRequest, NextApiResponse } from "next"
import IOpportunity from "@/types/opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = await serverAuthenticate(req)

  if (token?.email?.split("@")[1] !== "bountree.app") {
    return res.status(403).json({ success: false, error: "Forbidden" })
  }

  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const collection = db.collection("opportunities")

  const opportunity: IOpportunity = {
    title: "Investor Relations Associate",
    category: "Operations",
    description: `You'll help drive our mission to support early-stage tech entrepreneurs across the MENA region and beyond. As an Investor Relations Associate, you will be responsible for maintaining and building relationships with our current and potential investors, providing them with key insights into our portfolio companies and the broader venture capital landscape. You will work closely with our senior team members to support fundraising and business development efforts, and help shape the future of our ecosystem in the region. An ideal candidate should be prepared to commence as soon as possible from our Dubai office.`,
    idealCandidate: `The ideal candidate would have been one of the earliest employees in a VC (as an investor relations associate) or a B2B SaaS startup (involved in enterprise sales or growth hacking). Knowledge of data analytics tools (like Tableau) is a major plus.`,
    requirements: [
      "Bachelor's degree in a relevant field (e.g. Finance, Business, Economics).",
      "3-4 years of experience in investor relations or in a sales operations role at a fast-paced scale-up",
      "Advanced google sheet or excel skills",
      "Able to communicate business performance updates to investors verbally and in written/presentation form",
    ],
    status: "open",
    perks: {
      items: [
        "Competitive compensation package, top-tier medical insurance coverage and relocation package if relocating to the UAE.",
        "Professional training & development budget.",
        "Flexible working location during the summer period.",
        "Birthday and work anniversary days off.",
      ],
    },
    reward: {
      amount: 4000,
      currency: "USD",
    },
    salary: {
      min: 300000,
      max: 348000,
      currency: "AED",
    },
    location: "Dubai",
    remote: false,
    company: {
      name: "Beco Capital",
      about: `BECO Capital is a top decile TVPI UAE based early-stage fund with $450M AUM across 3 vintages that is growing exponentially to build a global platform that invests in cutting edge tech globally. We're a team of entrepreneurial digital natives and have invested in 45+ startups across a wide range of sectors, including the region's biggest success stories.`,
      url: "https://becocapital.com/",
      image: "/static/opportunities/beco.png",
      founded: "2012",
      industry: "Venture Capital",
      employees: "30+",
      stage: "growth",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const data = await collection.insertOne(opportunity)

  return res.status(200).json({ data })
}
