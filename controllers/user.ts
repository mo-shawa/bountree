import clientPromise from "../db/connect"
import { ObjectId } from "mongodb"
import IUser from "@/types/User"
import type IApplication from "@/types/Application"

export async function getAdminUsers() {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	try {
		return db
			.collection("users")
			.find({})
			.project({ name: 1, email: 1, createdAt: 1 })
			.sort({ createdAt: -1 })
			.toArray()
	} catch (error) {
		return { error }
	}
}

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
	application: IApplication
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

export async function getRecruiterOpportunities(id: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	try {
		return db
			.collection("users")
			.aggregate([
				{ $match: { _id: new ObjectId(id) } },
				{ $unwind: "$opportunitiesPursued" },
				{ $replaceRoot: { newRoot: "$opportunitiesPursued" } },
			])
			.toArray()
	} catch (error) {
		return { error }
	}
}
