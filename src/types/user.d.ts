import { ObjectId } from "mongodb"
import { DefaultUser } from "next-auth"

export default interface IUser extends DefaultUser {
  acceptedTerms: Date | null
  acceptedPrivacy: Date | null
  createdAt: Date
  updatedAt: Date
  totalEarnings: number
  potentialEarnings: number
}
