import { useState, useEffect } from "react"
import IOpportunity from "@/types/opportunity"
import { useRouter } from "next/router"

export default function Opportunity() {
	// Edit opportunity form
	const [opportunity, setOpportunity] = useState<IOpportunity>()
	const [opportunityFormData, setOpportunityFormData] = useState<IOpportunity>()

	const router = useRouter()

	const { id } = router.query

	useEffect(() => {
		async function fetchOpportunity() {
			const response = await fetch(`/api/opportunities/${id}`)
			const data = await response.json()
			setOpportunity(data)
			setOpportunityFormData(data)
		}

		if (id && router.isReady) fetchOpportunity()
	}, [router.isReady])

	function handleSubmit(event: any) {
		event.preventDefault()
		return
	}

	return (
		<>
			<form onSubmit={handleSubmit}>{JSON.stringify(opportunityFormData)}</form>
		</>
	)
}
