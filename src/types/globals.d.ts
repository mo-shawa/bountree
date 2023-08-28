import { MongoClient } from "mongodb"
declare global {
  var mongo: MongoClient
  var _mongoClientPromise: Promise<MongoClient>
}
