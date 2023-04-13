import { PushOperator } from 'mongodb'
import clientPromise from '../db/connect'
import IOpportunity, { Application } from '../src/types/Opportunity'
import { updateUser } from './user'
import { ObjectId, Filter } from 'mongodb'

export async function getOpportunityById(id: string) {
	const client = await clientPromise
	const db = client.db('bountree-dev')
	const foundOpportunity = await db
		.collection('opportunities')
		.findOne({ _id: new ObjectId(id) })
	return foundOpportunity
}

export async function createOpportunity(opportunity: IOpportunity) {
	const client = await clientPromise
	const db = client.db('bountree-dev')
	const newOpportunity = await db.collection('opportunities').insertOne({
		...opportunity,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	return newOpportunity
}

export async function getOpportunities() {
	const client = await clientPromise
	const db = client.db('bountree-dev')
	const opportunities = await db.collection('opportunities').find({}).toArray()
	return opportunities
}

export async function addApplicationToOpportunity(
	opportunityId: string,
	application: any // dunno how to type this
) {
	try {
		const client = await clientPromise
		const db = client.db('bountree-dev')

		const parsedApplication = JSON.parse(application)
		parsedApplication.recruiter = new ObjectId(parsedApplication.recruiter)

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
		return updatedOpportunity
	} catch (error) {
		return error
	}
}
