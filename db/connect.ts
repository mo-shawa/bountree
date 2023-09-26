import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb"

const uri = process.env.DATABASE_URI as string
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
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton()
    }
    return this._instance.clientPromise
  }
}
const clientPromise = Singleton.instance

export default clientPromise

// This is a bandaid at best. Use a serverless-ready database like FaunaDB or DynamoDB instead. Learn from my suffering.
