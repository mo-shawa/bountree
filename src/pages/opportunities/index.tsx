import { useEffect, useState, Suspense } from "react"
import Opportunities from "@/components/Opportunities"
import Layout from "@/components/Layout"
import IOpportunity from "@/types/Opportunity"
import { Loader } from "@/components/Loader/Loader"
import { useSession, signIn } from "next-auth/react"

export default function Dashboard() {
	const { data: session, status } = useSession()
	const [data, setData] = useState<IOpportunity[]>([])
	useEffect(() => {
		async function fetchData() {
			const res = await fetch("/api/opportunities")
			const data = await res.json()
			console.log(data)
			setData(data.data)
		}
		fetchData()
	}, [])

	if (status === "loading") return <Loader />

	if (status === "unauthenticated") {
		signIn("", { callbackUrl: window.location.href })
	}

	return (
		<Layout classNames="bg-b-blue-dark">
			<Suspense fallback={<Loader />}>
				<Opportunities data={data} />
			</Suspense>
		</Layout>
	)
}
