import type { Document, ObjectId } from "mongodb"
import IOpportunity from "./opportunity"
import IUser from "./user"

export default interface IApplication extends Document {
  _id?: ObjectId | string
  userId: ObjectId | string
  candidateEmail?: string
  opportunityId: ObjectId | string
  opportunity?: IOpportunity
  cv: File | string
  linkedin: string
  secondary?: string
  description: string
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
  rejectionFeedback?: string
}

type ApplicationStatus =
  | "pending"
  | "forwarded"
  | "interviewing"
  | "offered"
  | "hired"
  | "rejected"
