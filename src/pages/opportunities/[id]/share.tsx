import Top from '@/components/Opportunity/Top'
import SecondarySection from '@/components/Opportunity/SecondarySection'
import CompanySection from '@/components/Opportunity/CompanySection'
import IOpportunity from '@/types/opportunity'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@/components/Loader/Loader'
import BlankLayout from '@/components/Layout/BlankLayout'

export default function SharedOpportunity() {
	const router = useRouter()
	const { id } = router.query as { id: string }

	const [post, setPost] = useState<IOpportunity>()
	const [error, setError] = useState<string>()

	useEffect(() => {
		async function fetchPost() {
			const res = await fetch(`/api/opportunities/${id}/share`)
			const data = await res.json()

			console.log({ res, data })

			if (data.error) {
				setError(
					'An error occurred while loading the post. Please try again in a few minutes.'
				)
				return
			}

			setPost(data.opportunity)
		}

		if (router.isReady) fetchPost()
	}, [id, router.isReady])

	if (error) {
		return (
			<BlankLayout classNames="bg-b-blue-dark flex justify-center">
				<div className="py-10 bg-white rounded flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<h1 className="text-xl mx-auto rounded-full">{error}</h1>
				</div>
			</BlankLayout>
		)
	}
	if (!post) return <Loader />

	return (
		<BlankLayout classNames=" w-full bg-b-blue-dark">
			<section className="mx-auto max-w-2xl text-white">
				<Top post={post} />
				<SecondarySection post={post} />
				<CompanySection post={post} />
			</section>
		</BlankLayout>
	)
}
