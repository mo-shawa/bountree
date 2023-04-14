import { useState, useEffect } from 'react'
import { classNames } from '@/utils'
import { useSession } from 'next-auth/react'
import type { Application } from '@/types/Opportunity'
import IOpportunity from '@/types/Opportunity'

type Props = {
	userId: string
	opportunityId: string
	setModalOpen: (open: boolean) => void
	setPost: (post: IOpportunity) => void
	applicationsRemaining: number
}

export default function RecruitModal({
	userId,
	opportunityId,
	setModalOpen,
	setPost,
	applicationsRemaining,
}: Props) {
	const [formData, setFormData] = useState<Application>({
		recruiter: userId,
		linkedin: '',
		secondary: '',
		description: '',
	})

	const [disabled, setDisabled] = useState(true)
	const [success, setSuccess] = useState<boolean>()

	useEffect(() => {
		if (
			userId &&
			formData.linkedin.length > 0 &&
			formData.secondary.length > 0 &&
			formData.description.length > 0
		) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [formData, userId])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (
			!(
				userId &&
				formData.linkedin.length > 0 &&
				formData.secondary.length > 0 &&
				formData.description.length > 0
			)
		)
			return

		const res = await fetch(`/api/opportunities/${opportunityId}`, {
			method: 'POST',
			body: JSON.stringify(formData),
		})
		const json = await res.json()

		console.log({ json })

		if (!res.ok) {
			setSuccess(false)
			return
		}
		setPost(json.opportunity.value)
		setSuccess(true)
	}

	const handleOnClose = (
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => {
		e.preventDefault()
		e.stopPropagation()
		setModalOpen(false)
	}

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 transition-opacity"
					aria-hidden="true"
				>
					<div
						onClick={handleOnClose}
						className="absolute inset-0 backdrop-blur-md  flex items-center justify-center"
					>
						{success === undefined && (
							<form
								onClick={(e) => e.stopPropagation()}
								className="text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center"
							>
								<div className="form-control w-full max-w-xs">
									<label
										htmlFor="linkedin"
										className="label"
									>
										<span className="label-text">LinkedIn</span>
									</label>
									<input
										required
										value={formData.linkedin}
										name="linkedin"
										onChange={handleChange}
										type="text"
										placeholder="Candidate's LinkedIn Profile"
										className="input  bg-gray-100 shadow"
									/>
								</div>
								<div className="form-control w-full max-w-xs my-4">
									<label
										htmlFor="secondary"
										className="label"
									>
										<span className="label-text">Secondary link</span>
									</label>
									<input
										value={formData.secondary}
										name="secondary"
										onChange={handleChange}
										type="text"
										placeholder="Candidate's GitHub, Behance, etc."
										className="input  bg-gray-100 shadow"
									/>
								</div>
								<div className="form-control w-full max-w-xs mb-4">
									<label
										htmlFor="description"
										className="label"
									>
										<span className="label-text">Candidate description</span>
									</label>
									<textarea
										value={formData.description}
										name="description"
										onChange={handleChange}
										placeholder="What makes this candidate stand out?"
										className="textarea shadow h-24  bg-gray-100"
									/>
								</div>

								<button
									type="submit"
									onClick={handleSubmit}
									className={classNames(
										disabled
											? 'btn-disabled'
											: 'bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white',
										'btn mt-4'
									)}
								>
									Submit Candidate
								</button>
							</form>
						)}

						{success && (
							<div className="mx-4 text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center">
								<h1 className="text-2xl font-bold mb-4">Success!</h1>
								<p className="text-center mb-4">
									{`Your candidate has been submitted. You can submit
									${applicationsRemaining} more candidate(s) to this position.`}
								</p>
								<button
									onClick={handleOnClose}
									className="btn bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white"
								>
									Great!
								</button>
							</div>
						)}

						{success === false && (
							<div className="text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center">
								<h1 className="text-2xl font-bold mb-4">Error</h1>
								<p className="text-center mb-4">
									There was an error submitting your candidate. Please try
									again.
								</p>
								<button
									onClick={handleOnClose}
									className="btn bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white"
								>
									Ok
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
