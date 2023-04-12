import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../db/connect"

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
		jwt: async ({ token, user, account, profile, trigger }) => {
			console.log("jwt", { token, user, account, profile, trigger })

			if (user) {
				token.id = user.id
			}

			if (trigger === "signUp") {
				console.log("signUp", { user, account, profile, trigger })
				// create a new user

				const client = await clientPromise
				const db = client.db("bountree-dev")
				const newUser = await db.collection("users").updateOne(
					{ _id: user.id },
					{
						$set: {
							createdAt: new Date().toDateString(),
							updatedAt: new Date().toDateString(),
							opportunitiesPursued: [],
							totalEarnings: 0,
							potentialEarnings: 0,
						},
					}
				)

				console.log(newUser)
			}
			return token
		},
	},
})
