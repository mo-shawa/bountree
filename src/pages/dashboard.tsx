import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import IApplication from "@/types/Application"
import { useRouter } from "next/router"
import Sidebar from "@/components/Dashboard/Sidebar"
import MainContent from "@/components/Dashboard/MainContent"

export default function Dashboard() {
	const { data: session, status } = useSession()
	console.log(session)

	const [applicants, setApplicants] = useState<IApplication[]>([])
	const router = useRouter()

	useEffect(() => {
		async function getDashboardData() {
			const res = await fetch(`/api/users/${session?.user.id}/dashboard`)
			const data = await res.json()
			console.log(data)
			setApplicants(data.opportunities)
		}

		if (session) getDashboardData()
	}, [session])

	if (status === "unauthenticated") {
		signIn("", { callbackUrl: router.asPath })
	}

	return (
		<Layout classNames="bg-gray-50">
			<div className="mx-auto w-full max-w-7xl h-100 py-10 grid md:grid-cols-3 grid-cols-1 gap-28">
				<Sidebar session={session} />
				<MainContent applicants={applicants} />
			</div>
		</Layout>
	)
}
