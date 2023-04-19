import { useState, useEffect } from "react"
import { classNames } from "@/utils"

type Props = {
	showModal: boolean | undefined
	setShowModal: (accepted: boolean) => void
	userId: string
	updateSession: () => void
}

export default function PrivacyandTermsModal({
	setShowModal,
	userId,
	updateSession,
}: Props) {
	const [formData, setFormData] = useState({
		acceptedTerms: false,
		acceptedPrivacy: false,
	})

	const [disabled, setDisabled] = useState(true)
	const [success, setSuccess] = useState<boolean>()

	useEffect(() => {
		if (formData.acceptedTerms && formData.acceptedPrivacy) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [formData])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await fetch(`/api/users/${userId}/accept-tos`, {
			method: "PUT",
			body: JSON.stringify(formData),
		})

		if (!res.ok) {
			setSuccess(false)
			return
		}
		setShowModal(true)
		setSuccess(true)
	}

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 backdrop-blur-md  flex items-center justify-center">
						{success === undefined && (
							<form
								onClick={(e) => e.stopPropagation()}
								className="mx-4 shadow text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center"
							>
								<h2 className="text-2xl font-bold mb-5">Privacy and Terms</h2>

								<div className="form-control w-full max-w-sm">
									<label
										htmlFor="acceptedTerms"
										className="label cursor-pointer"
									>
										<input
											name="acceptedTerms"
											onChange={handleChange}
											type="checkbox"
										/>
										<span className="label-text">
											I confirm that I agree to the{" "}
											<a
												className="underline hover:text-b-yellow"
												target="_blank"
												href="/recruiter-contract"
											>
												Recruiter Agreement
											</a>
										</span>
									</label>
									<label
										htmlFor="acceptedPrivacy"
										className="label cursor-pointer"
									>
										<input
											name="acceptedPrivacy"
											onChange={handleChange}
											type="checkbox"
										/>
										<span className="label-text">
											I confirm that I agree to Bountree&apos;s{" "}
											<a
												className="underline hover:text-b-yellow"
												target="_blank"
												href="/privacy-policy"
											>
												Privacy Policy
											</a>
										</span>
									</label>
								</div>

								<button
									type="submit"
									onClick={handleSubmit}
									className={classNames(
										disabled
											? "btn-disabled"
											: "bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white",
										"btn mt-4"
									)}
								>
									Accept
								</button>
							</form>
						)}

						{success && (
							<div className="mx-4 text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center">
								<h1 className="text-2xl font-bold mb-4">Success!</h1>
								<p className="text-center mb-4">
									{`Successfully accepted the terms of service and privacy policy.`}
								</p>
								<button
									onClick={() => {
										updateSession()
										setShowModal(false)
									}}
									className="btn bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white"
								>
									Continue
								</button>
							</div>
						)}

						{success === false && (
							<div className="text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center">
								<h1 className="text-2xl font-bold mb-4">Error</h1>
								<p className="text-center mb-4">
									Something unexpected happened. Please try again later.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
