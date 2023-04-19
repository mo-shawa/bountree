import IApplication from "@/types/Application"
import clientPromise from "../db/connect"
import { ObjectId } from "mongodb"

export async function createApplication(
	application: IApplication,
	userId: string,
	opportunityId: string
) {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const applications = db.collection("applications")

	const newApplication = await applications.insertOne({
		...application,
		_id: new ObjectId(),
		userId: userId,
		opportunityId: opportunityId,
		createdAt: new Date(),
		updatedAt: new Date(),
	})

	return newApplication
}

export async function getApplications() {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const applications = await db.collection("applications").find({}).toArray()
	return applications
}

export async function getApplicationsByUser(id: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const applications = await db
		.collection("applications")
		.find({ userId: id })
		.toArray()
	return applications
}
