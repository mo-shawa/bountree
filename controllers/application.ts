import IApplication from '@/types/application'
import clientPromise from '../lib/connect'
import { ObjectId } from 'mongodb'
import { Timestamp, FieldPath } from 'firebase-admin/firestore'
import { firestore } from '../lib/firestore'

export async function createApplication(application: IApplication) {
	try {
		const applicationData = {
			...application,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		}

		const newApplication = await firestore
			.collection('applications')
			.add(applicationData)

		return newApplication
	} catch (error) {
		return { error }
	}

	// return newApplication
}

export async function getAdminApplications() {
	const applications = await constructApplicationsWithOpportunities()
	return applications

	// const applications = await db
	// 	.collection('applications')
	// 	.aggregate([
	// 		{
	// 			$lookup: {
	// 				from: 'opportunities',
	// 				localField: 'opportunityId',
	// 				foreignField: '_id',
	// 				as: 'opportunity',
	// 			},
	// 		},
	// 		{
	// 			$unwind: '$opportunity',
	// 		},
	// 		{
	// 			$lookup: {
	// 				from: 'users',
	// 				localField: 'userId',
	// 				foreignField: '_id',
	// 				as: 'user',
	// 			},
	// 		},
	// 		{
	// 			$unwind: {
	// 				path: '$user',
	// 			},
	// 		},
	// 	])
	// 	.sort({ createdAt: -1 })
	// 	.toArray()
	// return applications
}

export async function updateApplicationStatus(
	id: string,
	status: string,
	reason: string
) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)
	const applications = db.collection('applications')

	const updatedApplication = await applications.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{
			$set: {
				status,
				...(status === 'rejected' && reason
					? { rejectionFeedback: reason }
					: {}),
			},
		},
		{ returnDocument: 'after' }
	)

	return updatedApplication
}

export async function getApplicationsByUser(id: string) {
	return constructApplicationsWithOpportunities(id)
}

export async function checkDuplicateApplicant(
	opportunityId: string,
	linkedin: string,
	candidateEmail: string
) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)

	// Check if candidate has already been submitted to this opportunity

	const foundCandidate = await db.collection('applications').findOne({
		opportunityId: new ObjectId(opportunityId),
		$or: [{ linkedin }, { candidateEmail }],
	})

	return foundCandidate
}

async function constructApplicationsWithOpportunities(id?: string) {
	const userApplications = id
		? await firestore
				.collection('applications')
				.where('userId', '==', id)
				.orderBy('createdAt', 'desc')
				.get()
		: await firestore
				.collection('applications')
				.orderBy('createdAt', 'desc')
				.get()

	const applicationData = userApplications.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
		opportunityId: doc.data().opportunityId,
		userId: doc.data().userId,
		createdAt: doc.data().createdAt.toMillis(),
		updatedAt: doc.data().updatedAt.toMillis(),
	}))
	const opportunityIds = Array.from(
		new Set(applicationData.map((application) => application.opportunityId))
	)

	const userIds = Array.from(
		new Set(applicationData.map((application) => application.userId))
	)

	const users = await firestore
		.collection('users')
		.where(FieldPath.documentId(), 'in', userIds)
		.get()

	const userData = users.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
		createdAt: doc.data().createdAt.toMillis(),
		updatedAt: doc.data().updatedAt.toMillis(),
	}))

	const opportunities = await firestore
		.collection('opportunities')
		.where(FieldPath.documentId(), 'in', opportunityIds)
		.get()

	const opportunityData = opportunities.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
		createdAt: doc.data().createdAt.toMillis(),
		updatedAt: doc.data().updatedAt.toMillis(),
	}))

	const applications = applicationData.map((application) => ({
		...application,
		opportunity: opportunityData.find(
			(opportunity) => opportunity.id === application.opportunityId
		),
		user: userData.find((user) => user.id === application.userId),
	}))

	return applications
}
