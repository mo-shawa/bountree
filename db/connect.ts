import { Db, MongoClient, MongoClientOptions } from "mongodb"

if (!process.env.DATABASE_URI) {
	throw new Error('Invalid/Missing environment variable: "DATABASE_URL"')
}

const uri: string = process.env.DATABASE_URI

const options: MongoClientOptions = {
	maxPoolSize: 2,
	maxIdleTimeMS: 10000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options)
		global._mongoClientPromise = client.connect()
	}
	clientPromise = global._mongoClientPromise
} else {
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
}

export default clientPromise
