import Layout from '@/components/Layout/Layout'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import IApplication from '@/types/application'
import { useRouter } from 'next/router'
import Sidebar from '@/components/Dashboard/Sidebar'
import MainContent from '@/components/Dashboard/MainContent'
import { Loader } from '@/components/Loader/Loader'

export default function Dashboard() {
	const { data: session, status } = useSession()

	const [applicants, setApplicants] = useState<IApplication[]>([])
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	const getPotentialEarnings = (applicants: IApplication[]) => {
		const uniqueApplicants = applicants.filter(
			(app, index, self) =>
				index ===
					self.findIndex((t) => t.opportunityId === app.opportunity?.id) &&
				['pending', 'interviewing'].includes(app.status)
		)

		const potentialEarnings = uniqueApplicants.reduce((acc, curr) => {
			return acc + curr.opportunity?.reward.amount!
		}, 0)

		return potentialEarnings
	}

	getPotentialEarnings(applicants)

	const totalEarnings = applicants
		.filter((app) => app.status === 'hired')
		.reduce((acc, curr) => {
			return acc + curr.opportunity?.reward.amount!
		}, 0)

	// console.log(potentialEarnings)

	useEffect(() => {
		async function getDashboardData() {
			const res = await fetch(`/api/users/${session?.user.id}/dashboard`)
			const data = await res.json()
			setApplicants(data.applications)
			setLoading(false)
		}

		if (session) getDashboardData()
	}, [session])

	if (status === 'unauthenticated') {
		signIn('', { callbackUrl: router.asPath })
	}

	return (
		<Layout classNames="bg-gray-50 relative">
			<div className="mx-auto w-full max-w-7xl h-100 py-10 md:grid md:grid-cols-3 grid-cols-1 xl:gap-20 lg:gap-12 ">
				<Sidebar
					totalEarnings={totalEarnings}
					potentialEarnings={getPotentialEarnings(applicants)}
					session={session}
				/>
				<MainContent
					loading={loading}
					applicants={applicants}
				/>
			</div>
		</Layout>
	)
}
