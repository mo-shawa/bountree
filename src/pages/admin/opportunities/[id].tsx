import { useState, useEffect, ChangeEvent } from "react"
import IOpportunity from "@/types/opportunity"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Unauthorized from "@/components/Admin/Unauthorized"
import Layout from "@/components/Layout/Layout"
import { classNames } from "@/utils/misc"
import Image from "next/image"
import { Loader } from "@/components/Loader/Loader"

export default function Opportunity() {
	// Edit opportunity form

	const { data: session } = useSession()

	const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false

	const [opportunity, setOpportunity] = useState<IOpportunity>()
	const [opportunityFormData, setOpportunityFormData] = useState<
		Partial<IOpportunity>
	>({})

	const [requirements, setRequirements] = useState<string[]>([])
	const [perks, setPerks] = useState<string[]>([])

	const router = useRouter()

	const { id } = router.query

	useEffect(() => {
		async function fetchOpportunity() {
			const response = await fetch(`/api/opportunities/${id}`)
			const data = await response.json()
			const opportunity: IOpportunity = data.opportunity
			setOpportunity(opportunity)
			setOpportunityFormData(opportunity)
			setRequirements(opportunity.requirements)
			setPerks(opportunity.perks.items)
		}

		if (id && router.isReady) fetchOpportunity()
	}, [router.isReady, id])

	async function handleSubmit(event: any) {
		event.preventDefault()

		if (!opportunity) return

		// Send a PUT request to the API with only the fields that have changed
		const changedFields: Partial<IOpportunity> = {}

		for (const [key, value] of Object.entries(opportunityFormData)) {
			if (value !== opportunity[key]) {
				changedFields[key] = value
			}
		}

		if (requirements !== opportunity.requirements) {
			changedFields.requirements = requirements
		}

		if (perks !== opportunity.perks.items) {
			changedFields.perks = opportunityFormData.perks
			changedFields.perks!.items = perks
		}

		if (Object.keys(changedFields).length === 0) {
			alert("No changes were made.")
			return
		}

		const res = await fetch(`/api/opportunities/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(changedFields),
		})

		const data = await res.json()

		if (res.ok) {
			alert("Opportunity updated successfully.")
			router.push(`/opportunities/${id}`)
		} else {
			alert("Something went wrong.")
		}

		return
	}

	function handleChange(
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) {
		event.preventDefault()

		if (event.target.name.split(".").length > 1) {
			const [property, nestedProperty] = event.target.name.split(".")
			setOpportunityFormData({
				...opportunityFormData,
				[property]: {
					...opportunityFormData[property],

					[nestedProperty]:
						event.target.type === "number"
							? parseInt(event.target.value)
							: event.target.value,
				},
			})
			return
		}

		setOpportunityFormData({
			...opportunityFormData,
			[event.target.name]: event.target.value,
		})
	}

	function handleRequirementsChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.preventDefault()
		setRequirements(event.target.value.split("\n"))
	}

	function handlePerksChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.preventDefault()

		setPerks(event.target.value.split("\n"))
	}

	function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
		// event.preventDefault() stops the checkbox from being checked on the first click
		setOpportunityFormData({
			...opportunityFormData,
			[event.target.name]: event.target.checked,
		})
	}

	if (session && !isAdmin) {
		return <Unauthorized session={session} />
	}

	if (!opportunity) return <Loader />

	return (
		<Layout classNames="mt-12 mx-auto w-full py-10">
			<section className="max-w-3xl p-5 rounded mx-auto bg-white/10">
				<Image
					src={opportunity?.company.image}
					alt={opportunity?.company.name}
					width={100}
					height={100}
					className="rounded-md mx-auto"
				/>

				<p className=" my-3 text-center">
					A{" "}
					<span className="text-semibold text-warning border-warning border p-1 rounded">
						Yellow border
					</span>{" "}
					means that field will be updated.
				</p>
				<p className="my-3 text-center">
					Watch out for unintended changes 👉😎👉
				</p>

				<form className="w-full" onSubmit={handleSubmit}>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text ">Title</span>
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
						<label className="label ">
							<span className="label-text ">Category</span>
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
								<span className="label-text ">Description</span>
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
								<span className="label-text ">Ideal Candidate</span>
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
									<span className="label-text ">Requirements</span>
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
									<span className="label-text ">Status</span>
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
									<span className="label-text ">Perks</span>
								</label>
								<textarea
									rows={7}
									name="perks"
									value={perks.join("\n")}
									onChange={(e) => handlePerksChange(e)}
									className={classNames(
										"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent row  border-4",
										!perks.every((perk) =>
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
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text ">Reward</span>
								</label>
								<input
									type="number"
									name="reward.amount"
									value={opportunityFormData?.reward?.amount}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.reward?.amount !==
											opportunity?.reward?.amount
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">Reward Currency</span>
								</label>
								<input
									type="text"
									name="reward.currency"
									value={opportunityFormData?.reward?.currency}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.reward?.currency !==
											opportunity?.reward?.currency
											? "border-yellow-500  "
											: ""
									)}
								/>

								{opportunityFormData?.salary?.fixed ? (
									<>
										<label className="label">
											<span className="label-text ">Salary</span>
										</label>
										<input
											type="number"
											name="salary.fixed"
											value={opportunityFormData?.salary?.fixed}
											onChange={handleChange}
											className={classNames(
												"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
												opportunityFormData?.salary?.fixed !==
													opportunity?.salary?.fixed
													? "border-yellow-500  "
													: ""
											)}
										/>
									</>
								) : (
									<>
										<label className="label">
											<span className="label-text ">
												Minimum Salary
											</span>
										</label>
										<input
											type="number"
											name="salary.min"
											value={opportunityFormData?.salary?.min}
											onChange={handleChange}
											className={classNames(
												"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
												opportunityFormData?.salary?.min !==
													opportunity?.salary?.min
													? "border-yellow-500  "
													: ""
											)}
										/>
										<label className="label">
											<span className="label-text ">
												Maximum Salary
											</span>
										</label>
										<input
											type="number"
											name="salary.max"
											value={opportunityFormData?.salary?.max}
											onChange={handleChange}
											className={classNames(
												"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
												opportunityFormData?.salary?.max !==
													opportunity?.salary?.max
													? "border-yellow-500  "
													: ""
											)}
										/>
									</>
								)}

								<label className="label">
									<span className="label-text ">Salary Currency</span>
								</label>
								<input
									type="text"
									name="salary.currency"
									value={opportunityFormData?.salary?.currency}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.salary?.currency !==
											opportunity?.salary?.currency
											? "border-yellow-500  "
											: ""
									)}
								/>

								<label className="label">
									<span className="label-text ">Location</span>
								</label>
								<input
									type="text"
									name="location"
									value={opportunityFormData?.location}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.location !== opportunity?.location
											? "border-yellow-500  "
											: ""
									)}
								/>

								<label className="label">
									<span className="label-text ">Remote</span>
								</label>
								<input
									type="checkbox"
									name="remote"
									checked={opportunityFormData?.remote}
									onChange={handleCheckboxChange}
									className={classNames(
										"checkbox checkbox-lg ",
										opportunityFormData?.remote !== opportunity?.remote
											? "checkbox-warning "
											: "checkbox-success"
									)}
								/>
								<label className="label">
									<span className="label-text ">Company Name</span>
								</label>
								<input
									type="text"
									name="company.name"
									value={opportunityFormData?.company.name}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.name !==
											opportunity?.company?.name
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">Company About</span>
								</label>
								<textarea
									name="company.about"
									value={opportunityFormData?.company.about}
									onChange={handleChange}
									className={classNames(
										"textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.about !==
											opportunity?.company?.about
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">Company URL</span>
								</label>
								<input
									type="text"
									name="company.url"
									value={opportunityFormData?.company.url}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.url !==
											opportunity?.company?.url
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">Company Founded</span>
								</label>
								<input
									type="text"
									name="company.founded"
									value={opportunityFormData?.company.founded}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.founded !==
											opportunity?.company?.founded
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">
										Company Industry
									</span>
								</label>
								<input
									type="text"
									name="company.industry"
									value={opportunityFormData?.company.industry}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.industry !==
											opportunity?.company?.industry
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">
										Company Employees
									</span>
								</label>
								<input
									type="text"
									name="company.employees"
									value={opportunityFormData?.company.employees}
									onChange={handleChange}
									className={classNames(
										"input input-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.employees !==
											opportunity?.company?.employees
											? "border-yellow-500  "
											: ""
									)}
								/>
								<label className="label">
									<span className="label-text ">Company Stage</span>
								</label>
								<select
									name="company.stage"
									value={opportunityFormData?.company.stage}
									onChange={handleChange}
									className={classNames(
										"select select-bordered w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent border-4",
										opportunityFormData?.company?.stage !==
											opportunity?.company?.stage
											? "border-yellow-500  "
											: ""
									)}
								>
									{[
										"preseed",
										"seed",
										"A",
										"B",
										"C",
										"D",
										"E",
										"F",
										"IPO",
										"acquired",
										"growth",
									].map((stage) => (
										<option key={stage} value={stage}>
											{stage}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className="card-actions">
						<button type="submit" className="btn btn-warning btn-block mt-4">
							Submit
						</button>
					</div>
				</form>
			</section>
		</Layout>
	)
}
