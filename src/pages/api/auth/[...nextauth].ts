import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../db/connect"
import { ObjectId } from "mongodb"
import { updateUser, getUser } from "../../../../controllers/user"

export default NextAuth({
	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: process.env.JWT_SECRET as string,
	},
	providers: [
		LinkedInProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID as string,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	debug: process.env.NODE_ENV === "development",

	theme: {
		// logo: "/favicon/android-chrome-512x512.png",
		logo: "/static/svg/logo.svg",
		brandColor: "#1B262C",
	},
	adapter: MongoDBAdapter(clientPromise, { databaseName: "bountree-dev" }),
	callbacks: {
		session: async ({ session, token }) => {
			const id = token.sub!
			session.user.id = id

			const foundUser = await getUser(id)

			if (foundUser) {
				session.user = { ...session.user, ...foundUser }
			}

			return Promise.resolve(session)
		},
	},

	events: {
		signIn: async ({ user, isNewUser }) => {
			if (!isNewUser) return

			await updateUser(user.id, {
				createdAt: new Date(),
				updatedAt: new Date(),
				opportunitiesPursued: [],
				totalEarnings: 0,
				potentialEarnings: 0,
				acceptedTerms: null,
				acceptedPrivacy: null,
			})
		},
	},
})
