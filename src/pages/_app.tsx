import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import { Analytics } from "@vercel/analytics/react"
import { IntercomProvider } from "react-use-intercom"

const intercomAppId = process.env.INTERCOM_APP_ID as string

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<IntercomProvider appId={intercomAppId} autoBoot>
				<Component {...pageProps} />
				<Analytics />
			</IntercomProvider>
		</SessionProvider>
	)
}
