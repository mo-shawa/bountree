import IUser from "@/types/User"
import { ObjectId, Document } from "mongodb"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface User extends IUser {}

	interface Session extends DefaultSession {
		user: User & Document<IUser>
	}
}

declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
