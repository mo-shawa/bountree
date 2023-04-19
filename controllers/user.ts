import clientPromise from "../db/connect"
import { ObjectId } from "mongodb"
import IUser from "@/types/User"
import type { RecruiterOpportunity } from "@/types/User"

export async function updateUser(id: string, data: Partial<IUser>) {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	try {
		return db
			.collection("users")
			.updateOne({ _id: new ObjectId(id) }, { $set: data })
	} catch (error) {
		return { error }
	}
}

export async function addApplicationToUser(
	id: string,
	application: RecruiterOpportunity
) {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	try {
		return db.collection("users").updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					opportunitiesPursued: application,
				},
			}
		)
	} catch (error) {
		return { error }
	}
}

export async function getUser(id: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	try {
		return db.collection("users").findOne({ _id: new ObjectId(id) })
	} catch (error) {
		return { error }
	}
}

export async function acceptTOS(id: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	try {
		return db
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { acceptedTerms: new Date(), acceptedPrivacy: new Date() } }
			)
	} catch (error) {
		return { error }
	}
}
