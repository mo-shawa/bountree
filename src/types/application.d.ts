import type { Document, ObjectId } from "mongodb"
import IOpportunity from "./opportunity"
import IUser from "./user"

export type Application = {
  _id: ObjectId | string
  id?: string
  userId: ObjectId | string
  name: string
  candidateEmail?: string
  opportunityId: ObjectId | string
  opportunity?: IOpportunity
  cv: File | string
  linkedin: string
  secondary?: string
  description: string
  status: ApplicationStatus
  createdAt: Datestring
  updatedAt: Datestring
  rejectionFeedback?: string
}

export type ApplicationWithout_Id = Omit<Application, "_id">

export type ApplicationWithUser = Application & { user: IUser }

export type ApplicationInput = Omit<
  Application,
  "_id" | "createdAt" | "updatedAt" | "status"
>

type ApplicationStatus =
  | "pending"
  | "forwarded"
  | "interviewing"
  | "offered"
  | "hired"
  | "rejected"
