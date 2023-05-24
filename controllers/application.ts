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
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)
	const applications = await db
		.collection('applications')
		.aggregate([
			{
				$lookup: {
					from: 'opportunities',
					localField: 'opportunityId',
					foreignField: '_id',
					as: 'opportunity',
				},
			},
			{
				$unwind: '$opportunity',
			},
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: {
					path: '$user',
				},
			},
		])
		.sort({ createdAt: -1 })
		.toArray()
	return applications
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
	const userApplications = await firestore
		.collection('applications')
		.where('userId', '==', id)
		.get()

	const applicationData = userApplications.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
		opportunityId: doc.data().opportunityId,
		createdAt: doc.data().createdAt.toMillis(),
		updatedAt: doc.data().updatedAt.toMillis(),
	}))
	const opportunityIds = Array.from(
		new Set(applicationData.map((application) => application.opportunityId))
	)

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
	}))

	console.log({
		applicationData,
		opportunityIds,
		opportunities,
		opportunityData,
		applications,
	})

	return applications
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
