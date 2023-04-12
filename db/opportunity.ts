import { Db } from "mongodb"
import IOpportunity from "../src/types/Opportunity"

export async function getOpportunityById(db: Db, id: string) {
	const foundOpportunity = await db
		.collection("Opportunities")
		.findOne({ _id: id })
	return foundOpportunity
}

export async function createOpportunity(
	db: Db,
	opportunity: Partial<IOpportunity>
) {
	const newOpportunity = await db.collection("Opportunities").insertOne({
		...opportunity,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	return newOpportunity
}

export async function getOpportunities(db: Db) {
	const opportunities = await db.collection("Opportunities").find({}).toArray()
	return opportunities
}
