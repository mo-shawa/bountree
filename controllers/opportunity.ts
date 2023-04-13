import clientPromise from "../db/connect"
import IOpportunity from "../src/types/Opportunity"
import { ObjectId } from "mongodb"

export async function getOpportunityById(id: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const foundOpportunity = await db
		.collection("opportunities")
		.findOne({ _id: new ObjectId(id) })
	return foundOpportunity
}

export async function createOpportunity(opportunity: IOpportunity) {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const newOpportunity = await db.collection("opportunities").insertOne({
		...opportunity,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	return newOpportunity
}

export async function getOpportunities() {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const opportunities = await db.collection("opportunities").find({}).toArray()
	return opportunities
}
