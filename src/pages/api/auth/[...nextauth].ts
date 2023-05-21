import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { firestore } from '../../../../firebase/firestore'
import { updateUser, getUser } from '../../../../controllers/user'
import { sendWelcomeEmail } from '@/utils/email'

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.JWT_SECRET as string,
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	debug: process.env.NODE_ENV === 'development',

	theme: {
		logo: '/static/svg/logo.svg',
		brandColor: '#1B262C',
		colorScheme: 'dark',
	},
	adapter: FirestoreAdapter(firestore),
	callbacks: {
		// session: async ({ session, token }) => {
		// 	const id = token.sub!
		// 	session.user.id = id

		// 	const foundUser = await getUser(id)

		// 	if (foundUser) {
		// 		session.user = { ...session.user, ...foundUser }
		// 	}

		// 	return Promise.resolve(session)
		// },
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id
			}
			return Promise.resolve(token)
		},
	},

	events: {
		signIn: async ({ user, isNewUser }) => {
			console.log({ user, isNewUser })
			if (!isNewUser) return
			// await updateUser(user.id, {
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// 	totalEarnings: 0,
			// 	potentialEarnings: 0,
			// 	acceptedTerms: null,
			// 	acceptedPrivacy: null,
			// })
			await sendWelcomeEmail(user)
		},
	},
})
