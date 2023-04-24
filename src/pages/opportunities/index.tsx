import { useEffect, useState, Suspense } from "react"
import Opportunities from "@/components/Opportunities"
import Layout from "@/components/Layout"
import IOpportunity from "@/types/Opportunity"
import { Loader } from "@/components/Loader/Loader"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

export default function Dashboard() {
	const router = useRouter()
	const { status } = useSession()
	const [data, setData] = useState<IOpportunity[]>()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		async function fetchData() {
			const res = await fetch("/api/opportunities")
			const data = await res.json()

			setData(data.data)
			setLoading(false)
		}
		if (router.isReady) fetchData()
	}, [router.isReady])

	if (status === "loading") return <Loader />

	if (status === "unauthenticated") {
		signIn("", { callbackUrl: window.location.href })
	}

	return (
		<Layout classNames="bg-b-blue-dark">
			{loading ? (
				<Loader>
					<h1 className="text-white text-2xl font-bold">
						Loading Opportunities
					</h1>
				</Loader>
			) : (
				<Opportunities data={data || []} />
			)}
		</Layout>
	)
}
