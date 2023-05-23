import clientPromise from '../firebase/connect'
import IOpportunity from '../src/types/opportunity'
import { ObjectId } from 'mongodb'
import { firestore } from '../firebase/firestore'
import { Timestamp } from 'firebase-admin/firestore'

export async function getOpportunityByIdWithApplications(id: string) {
	const foundOpportunity = await firestore
		.collection('opportunities')
		.doc(id)
		.get()

	if (!foundOpportunity || !foundOpportunity.exists) return null

	const applications = await firestore
		.collection('applications')
		.where('opportunityId', '==', id)
		.get()

	console.log({ foundOpportunity, applications })

	return {
		...foundOpportunity.data(),
		id: foundOpportunity.id,
		createdAt: foundOpportunity.data()?.createdAt.toMillis(),
		updatedAt: foundOpportunity.data()?.updatedAt.toMillis(),
		applications: applications.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
			createdAt: doc.data().createdAt.toMillis(),
			updatedAt: doc.data().updatedAt.toMillis(),
		})),
	}
}

export async function getOpportunityById(id: string) {
	const foundOpportunity = await firestore
		.collection('opportunities')
		.doc(id)
		.get()

	if (!foundOpportunity.exists) return null
	return foundOpportunity
}

export async function createOpportunity(opportunity: IOpportunity) {
	const opportunityData = {
		...opportunity,
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now(),
	}

	const newOpportunity = await firestore
		.collection('opportunities')
		.add(opportunityData)

	return newOpportunity
}

export async function getOpportunities() {
	const opportunities = await firestore
		.collection('opportunities')
		.orderBy('createdAt', 'desc')
		.get()

	return opportunities.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
		createdAt: doc.data().createdAt.toMillis(),
		updatedAt: doc.data().updatedAt.toMillis(),
	}))
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
			.collection('opportunities')
			.findOneAndUpdate(
				{ _id: new ObjectId(opportunityId) },
				{
					$push: {
						applications: parsedApplication,
					},
				},
				{ returnDocument: 'after' }
			)
		return { updatedOpportunity, applicationId: parsedApplication._id }
	} catch (error) {
		console.error(error)
	}
}

export async function updateOpportunity(
	opportunityId: string,
	opportunity: IOpportunity
) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)
	const updatedOpportunity = await db
		.collection('opportunities')
		.findOneAndUpdate(
			{ _id: new ObjectId(opportunityId) },
			{
				$set: {
					...opportunity,
					updatedAt: new Date(),
				},
			},
			{ returnDocument: 'after' }
		)
	return updatedOpportunity
}
