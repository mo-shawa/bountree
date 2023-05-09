import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import { Analytics } from "@vercel/analytics/react"
import { IntercomProvider } from "react-use-intercom"
import { hotjar } from "react-hotjar"

const intercomAppId = "wkv87k2i"
export default function App({ Component, pageProps }: AppProps) {
	if (typeof window !== "undefined") {
		hotjar.initialize(3483093, 6)
	}
	return (
		<IntercomProvider
			appId={intercomAppId}
			autoBoot={true}
			autoBootProps={{
				backgroundColor: "#1B262C",
				actionColor: "#BBE1FA",
				verticalPadding: 60,
			}}
		>
			<SessionProvider>
				<Component {...pageProps} />
				<Analytics />
			</SessionProvider>
		</IntercomProvider>
	)
}
