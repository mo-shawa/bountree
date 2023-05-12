import { useState, useEffect, ChangeEvent } from "react"
import IOpportunity from "@/types/opportunity"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Unauthorized from "@/components/Admin/Unauthorized"
import Layout from "@/components/Layout/Layout"
import { classNames } from "@/utils/misc"
import Image from "next/image"

export default function Opportunity() {
	// Edit opportunity form

	const { data: session } = useSession()

	const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false

	const [opportunity, setOpportunity] = useState<IOpportunity>()
	const [opportunityFormData, setOpportunityFormData] =
		useState<Partial<IOpportunity>>()

	const [requirements, setRequirements] = useState<string[]>([])
	const [perks, setPerks] = useState({
		description: "",
		items: [],
	})

	const router = useRouter()

	const { id } = router.query

	useEffect(() => {
		async function fetchOpportunity() {
			const response = await fetch(`/api/opportunities/${id}`)
			const data = await response.json()
			console.log(data)
			const opportunity: IOpportunity = data.opportunity
			setOpportunity(opportunity)
			setOpportunityFormData(opportunity)
			setRequirements(opportunity.requirements)
			setPerks(opportunity.perks as any)
		}

		if (id && router.isReady) fetchOpportunity()
	}, [router.isReady])

	function handleSubmit(event: any) {
		event.preventDefault()
		return
	}

	function handleChange(
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) {
		event.preventDefault()

		setOpportunityFormData({
			...opportunityFormData,
			[event.target.name]: event.target.value,
		})
	}

	function handleRequirementsChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.preventDefault()
		setRequirements(event.target.value.split("\n"))
	}

	function handlePerksChange(
		event: ChangeEvent<HTMLTextAreaElement>,
		type: "description" | "items"
	) {
		event.preventDefault()
		if (type === "description")
			setPerks({
				...perks,
				description: event.target.value,
			})

		if (type === "items")
			setPerks({
				...perks,
				items: event.target.value.split("\n"),
			})
	}

	if (session && !isAdmin) {
		return <Unauthorized session={session} />
	}

	return (
		<Layout classNames="bg-b-blue-dark mx-auto w-full py-10">
			<section className="max-w-3xl p-5 rounded mx-auto bg-white/10">
				<Image
					src={opportunity?.company.image}
					alt={opportunity?.company.name}
					width={100}
					height={100}
					className="rounded-md mx-auto"
				/>
				<form className="w-full" onSubmit={handleSubmit}>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text text-white">Title</span>
						</label>
						<input
							type="text"
							name="title"
							value={opportunityFormData?.title}
							onChange={handleChange}
							className={classNames(
								"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
								opportunityFormData?.title !== opportunity?.title
									? "border-yellow-500  "
									: ""
							)}
						/>
					</div>
					<div className="form-control w-full ">
						<label className="label text-white">
							<span className="label-text text-white">Category</span>
						</label>
						<select
							className={classNames(
								"select select-bordered border-4 w-full max-w-xs",
								opportunityFormData?.category !== opportunity?.category
									? "border-yellow-500 "
									: ""
							)}
							name="category"
							value={opportunityFormData?.category}
							onChange={handleChange}
						>
							{[
								"Engineering",
								"Product",
								"Marketing",
								"Operations",
								"Legal",
							].map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text text-white">Description</span>
							</label>
							<textarea
								name="description"
								value={opportunityFormData?.description}
								onChange={handleChange}
								className={classNames(
									"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
									opportunityFormData?.description !== opportunity?.description
										? "border-yellow-500 "
										: ""
								)}
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text text-white">Ideal Candidate</span>
							</label>
							<textarea
								rows={7}
								name="idealCandidate"
								value={opportunityFormData?.idealCandidate}
								onChange={handleChange}
								className={classNames(
									"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
									opportunityFormData?.idealCandidate !==
										opportunity?.idealCandidate
										? "border-yellow-500 "
										: ""
								)}
							/>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text text-white">Requirements</span>
								</label>
								<textarea
									rows={7}
									name="requirements"
									value={requirements.join("\n")}
									onChange={handleRequirementsChange}
									className={classNames(
										"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent row  border-4",
										!requirements.every((requirement) =>
											opportunity?.requirements.includes(requirement)
										)
											? "border-yellow-500 "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text"></span>
									<span className="label-text badge badge-error">
										Seperate by Enter (new line)
									</span>
								</label>
							</div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text text-white">Status</span>
								</label>
								<select
									className={classNames(
										"select select-bordered border-4 w-full max-w-xs",
										opportunityFormData?.status !== opportunity?.status
											? "border-yellow-500 "
											: ""
									)}
									name="status"
									value={opportunityFormData?.status}
									onChange={handleChange}
								>
									{["open", "closed", "paused"].map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text text-white">Perks</span>
								</label>
								{opportunity?.perks.description && (
									<>
										<label className="label">
											<span className="label-text text-white">Perks</span>
										</label>
										<textarea
											rows={7}
											name="perks"
											value={perks.description}
											onChange={(e) => handlePerksChange(e, "description")}
											className={classNames(
												"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent row  border-4",
												perks.description !== opportunity?.perks.description
													? "border-yellow-500 "
													: ""
											)}
										/>
									</>
								)}
								<label className="label">
									<span className="label-text text-white">Items</span>
								</label>
								<textarea
									rows={7}
									name="perks"
									value={perks.items.join("\n")}
									onChange={(e) => handlePerksChange(e, "items")}
									className={classNames(
										"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent row  border-4",
										!perks.items.every((perk) =>
											opportunity?.perks.items.includes(perk)
										)
											? "border-yellow-500 "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text"></span>
									<span className="label-text badge badge-error">
										Seperate by Enter (new line)
									</span>
								</label>
							</div>
						</div>
					</div>
				</form>
			</section>
		</Layout>
	)
}
