import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import { Analytics } from "@vercel/analytics/react"
import { hotjar } from "react-hotjar"

export default function App({ Component, pageProps }: AppProps) {
	if (typeof window !== "undefined") {
		hotjar.initialize(3483093, 6)
	}
	return (
			<SessionProvider>
				<Component {...pageProps} />
				<Analytics />
			</SessionProvider>
	)
}
