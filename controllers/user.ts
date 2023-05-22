import clientPromise from '../firebase/connect'
import { ObjectId } from 'mongodb'
import IUser from '@/types/user'
import type IApplication from '@/types/application'
import { firestore } from '../firebase/firestore'
import { Timestamp } from 'firebase-admin/firestore'

export async function getAdminUsers() {
	try {
		const users = await firestore.collection('users').get()
		console.log({ users })

		return users.docs.map((doc) => ({
			...doc.data(),
			createdAt: doc.data().createdAt.toMillis(),
		}))
	} catch (error) {
		return { error }
	}
}

export async function updateUser(id: string, data: Partial<IUser>) {
	try {
		return await firestore.doc(`users/${id}`).set({ ...data }, { merge: true })
	} catch (error) {
		return { error }
	}
}

export async function addApplicationToUser(
	id: string,
	application: IApplication
) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)

	try {
		return db.collection('users').updateOne(
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
	try {
		const user = await firestore.doc(`users/${id}`).get()
		return user.data()
	} catch (error) {
		return { error }
	}
}

export async function acceptTOS(id: string) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)

	try {
		return db
			.collection('users')
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
	const db = client.db(process.env.DATABASE_NAME)

	try {
		return db
			.collection('users')
			.aggregate([
				{ $match: { _id: new ObjectId(id) } },
				{ $unwind: '$opportunitiesPursued' },
				{ $replaceRoot: { newRoot: '$opportunitiesPursued' } },
			])
			.toArray()
	} catch (error) {
		return { error }
	}
}
