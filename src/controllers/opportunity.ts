import clientPromise from "../../db/connect"
import { Opportunity } from "../types/opportunity"
import { ObjectId } from "mongodb"

export async function getLatestOpportunities() {
  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const opportunities = await db
    .collection("opportunities")
    .find({})
    .sort("createdAt", -1)
    .limit(3)
    .toArray()
  return opportunities
}

export async function getOpportunityByIdWithApplications(id: string) {
  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const foundOpportunity = await db
    .collection("opportunities")
    .findOne({ _id: new ObjectId(id) })
  if (!foundOpportunity) return null

  const applications = await db
    .collection("applications")
    .find({ opportunityId: new ObjectId(id) })
    .toArray()

  foundOpportunity.applications = applications
  return foundOpportunity
}

export async function getOpportunityById(id: string) {
  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const foundOpportunity = await db
    .collection("opportunities")
    .findOne({ _id: new ObjectId(id) })
  if (!foundOpportunity) return null

  return foundOpportunity
}

export async function createOpportunity(opportunity: Opportunity) {
  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const newOpportunity = await db
    .collection<Opportunity>("opportunities")
    .insertOne({
      ...opportunity,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  return newOpportunity
}

export async function getOpportunities() {
  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const opportunities = await db
    .collection("opportunities")
    .find({})
    .sort("createdAt", -1) // this sort won't work if we're serving closed opportunities
    .toArray()
  return opportunities
}

export async function addApplicationToOpportunity(
  opportunityId: string,
  application: any // dunno how to type this
): Promise<any> {
  try {
    const client = await clientPromise
    const db = client.db(process.env.DATABASE_NAME)

    const parsedApplication = JSON.parse(application)
    parsedApplication._id = new ObjectId()
    parsedApplication.recruiter = new ObjectId(parsedApplication.recruiter)
    parsedApplication.createdAt = new Date()
    parsedApplication.updatedAt = new Date()

    const updatedOpportunity = await db
      .collection("opportunities")
      .findOneAndUpdate(
        { _id: new ObjectId(opportunityId) },
        {
          $push: {
            applications: parsedApplication,
          },
        },
        { returnDocument: "after" }
      )
    return { updatedOpportunity, applicationId: parsedApplication._id }
  } catch (error) {
    console.error(error)
  }
}

export async function updateOpportunity(
  opportunityId: string,
  opportunity: Opportunity
) {
  const client = await clientPromise
  const db = client.db(process.env.DATABASE_NAME)
  const updatedOpportunity = await db
    .collection("opportunities")
    .findOneAndUpdate(
      { _id: new ObjectId(opportunityId) },
      {
        $set: {
          ...opportunity,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    )
  return updatedOpportunity
}
