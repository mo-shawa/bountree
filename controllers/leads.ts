import clientPromise from '../firebase/connect'

export async function addEmailAddress(email: string) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)

	try {
		return db
			.collection('marketing-emails')
			.insertOne({ email: email, createdAt: new Date() })
	} catch (error) {
		return { error }
	}
}

export async function checkEmailListForUser(email: string) {
	const client = await clientPromise
	const db = client.db(process.env.DATABASE_NAME)

	try {
		return db.collection('marketing-emails').findOne({ email })
	} catch (error) {
		return { error }
	}
}
