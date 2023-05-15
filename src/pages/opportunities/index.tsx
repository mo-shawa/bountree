import { useEffect, useState, Suspense } from "react"
import MappedOpportunities from "@/components/Opportunities/MappedOpportunities"
import Layout from "@/components/Layout/Layout"
import IOpportunity from "@/types/opportunity"
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

			const openOpportunities = data.data.filter(
				(opportunity: IOpportunity) => opportunity.status === "open"
			)

			const closedOrPausedOpportunities = data.data.filter(
				(opportunity: IOpportunity) =>
					opportunity.status === "closed" || opportunity.status === "paused"
			)

			setData(openOpportunities.concat(closedOrPausedOpportunities))
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
			{loading ? <Loader /> : <MappedOpportunities data={data || []} />}
		</Layout>
	)
}
