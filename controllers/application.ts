import IApplication from "@/types/Application"
import clientPromise from "../db/connect"
import { ObjectId } from "mongodb"

export async function createApplication(
	application: IApplication
): Promise<any> {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const applications = db.collection("applications")

	const newApplication = await applications.insertOne({
		...application,
		_id: new ObjectId(),
		userId: new ObjectId(application.userId),
		opportunityId: new ObjectId(application.opportunityId),
		createdAt: new Date(),
		updatedAt: new Date(),
	})

	return newApplication
}

export async function getAdminApplications() {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const applications = await db
		.collection("applications")
		.aggregate([
			{
				$lookup: {
					from: "opportunities",
					localField: "opportunityId",
					foreignField: "_id",
					as: "opportunity",
				},
			},
			{
				$unwind: "$opportunity",
			},
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$unwind: {
					path: "$user",
				},
			},
		])
		.sort({ createdAt: -1 })
		.toArray()
	return applications
}

export async function updateApplicationStatus(id: string, status: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")
	const applications = db.collection("applications")

	const updatedApplication = await applications.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $set: { status } },
		{ returnDocument: "after" }
	)

	return updatedApplication
}

export async function getApplicationsByUser(id: string) {
	const client = await clientPromise
	const db = client.db("bountree-dev")

	const applications = await db
		.collection("applications")
		.aggregate([
			{
				$match: {
					userId: new ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "opportunities",
					localField: "opportunityId",
					foreignField: "_id",
					as: "opportunity",
				},
			},
			{
				$unwind: "$opportunity",
			},
		])
		.toArray()

	console.log(applications)

	return applications
}
