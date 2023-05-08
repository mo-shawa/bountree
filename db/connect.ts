import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb"

const uri = process.env.DATABASE_URI as string // your mongodb connection string
const options: MongoClientOptions = {
	maxPoolSize: 1,
	maxIdleTimeMS: 10000,
	serverSelectionTimeoutMS: 10000,
	socketTimeoutMS: 10000,
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
}

class Singleton {
	private static _instance: Singleton
	private client: MongoClient
	private clientPromise: Promise<MongoClient>
	private constructor() {
		this.client = new MongoClient(uri, options)
		this.clientPromise = this.client.connect()
		if (process.env.NODE_ENV === "development") {
			// In development mode, use a global variable so that the value
			// is preserved across module reloads caused by HMR (Hot Module Replacement).
			global._mongoClientPromise = this.clientPromise
		}

		this.client.addListener("close", () => {
			console.log("MongoDB connection closed")
		})
		this.client.addListener("reconnect", () => {
			console.log("MongoDB reconnected")
		})
		this.client.addListener("timeout", () => {
			console.log("MongoDB connection timed out")
		})
		this.client.addListener("error", (err) => {
			console.log("MongoDB error", err)
		})
		this.client.addListener("connectionPoolClosed", () => {
			console.log("MongoDB connection pool closed")
		})
		this.client.addListener("connectionPoolCreated", () => {
			console.log("MongoDB connection pool created")
		})
		this.client.addListener("connectionCreated", () => {
			console.log("MongoDB connection created")
		})
	}

	public static get instance() {
		if (!this._instance) {
			this._instance = new Singleton()
		}
		return this._instance.clientPromise
	}
}
const clientPromise = Singleton.instance

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
