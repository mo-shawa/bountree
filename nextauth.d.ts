import IUser from "@/types/User"
import { ObjectId } from "mongodb"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface User extends IUser {}

	interface Session extends DefaultSession {
		user: User
	}
}

declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
