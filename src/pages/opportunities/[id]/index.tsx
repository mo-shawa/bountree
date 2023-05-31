import { useRouter } from 'next/router'
import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import IOpportunity from '../../../types/opportunity'
import { useSession } from 'next-auth/react'
import Loader from '@/components/Loader/Loader'
import { signIn } from 'next-auth/react'
import RecruitModal from '@/components/Modals/RecruitModal/RecruitModal'
import IApplication from '@/types/application'
import PrimarySection from '@/components/Opportunity/PrimarySection'
import ReferralCard from '@/components/Opportunity/ReferralCard'

export default function PostDetail() {
	const router = useRouter()
	const { id } = router.query as { id: string }

	const { data: session, status } = useSession()

	const [post, setPost] = useState<IOpportunity>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [error, setError] = useState<string>()
	const [applicationsRemaining, setApplicationsRemaining] = useState<number>(5)

	const isAdmin = session?.user.email.split('@')[1] === 'bountree.app' || false

	useEffect(() => {
		async function fetchPost() {
			const res = await fetch(`/api/opportunities/${id}`)
			const data = await res.json()

			if (!res.ok || data.success === false) {
				setError(
					'An error occurred while loading the post. Please try again in a few minutes.'
				)
				return
			}

			setPost(data.opportunity)
		}

		if (router.isReady) fetchPost()
	}, [id, router.isReady])

	useEffect(() => {
		if (!post) return

		setApplicationsRemaining(
			(session?.user.applicationLimit || 5) -
				post.applications.filter(
					(a: IApplication) => a.userId === session?.user._id
				).length
		)
	}, [post])

	if (status === 'loading') return <Loader />

	if (status === 'unauthenticated' || session === null) {
		signIn('', { callbackUrl: window.location.href })
	}

	if (error) {
		return (
			<Layout classNames="bg-b-blue-dark flex justify-center">
				<div className="py-10 bg-white rounded flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<h1 className="text-xl mx-auto rounded-full">{error}</h1>
				</div>
			</Layout>
		)
	}

	if (!post) return <Loader />

	return (
		<Layout classNames="bg-b-blue-dark flex justify-center">
			<section className="px-4 text-white max-w-7xl w-full grid grid-cols-6 ">
				<PrimarySection
					post={post}
					applicationsRemaining={applicationsRemaining}
					setModalOpen={setModalOpen}
					isAdmin={isAdmin}
				/>
				<ReferralCard
					post={post}
					applicationsRemaining={applicationsRemaining}
					setModalOpen={setModalOpen}
					isAdmin={isAdmin}
				/>
				{modalOpen && (
					<RecruitModal
						requirements={post.requirements}
						opportunityId={id}
						userId={session?.user.id}
						setModalOpen={setModalOpen}
						setPost={setPost}
						applicationsRemaining={applicationsRemaining}
						setApplicationsRemaining={setApplicationsRemaining}
					/>
				)}
			</section>
		</Layout>
	)
}
