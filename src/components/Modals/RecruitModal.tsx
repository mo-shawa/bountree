import { useState, useEffect } from "react"
import { classNames } from "@/utils"
import type { Application } from "@/types/Opportunity"
import IOpportunity from "@/types/Opportunity"
import { Loader } from "../Loader/Loader"

type Props = {
	userId: string
	opportunityId: string
	setModalOpen: (open: boolean) => void
	setPost: (post: IOpportunity) => void
	applicationsRemaining: number
}

type GCSUploadData =
	| {
			url: string
			gcsFormData: FormData
			fileName: string
	  }
	| undefined

export default function RecruitModal({
	userId,
	opportunityId,
	setModalOpen,
	setPost,
	applicationsRemaining,
}: Props) {
	const [formData, setFormData] = useState<Application>({
		name: "",
		cv: "",
		recruiter: userId,
		linkedin: "",
		secondary: "",
		description: "",
	})

	const [file, setFile] = useState<File>()
	const [disabled, setDisabled] = useState(true)
	const [success, setSuccess] = useState<boolean>()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")

	useEffect(() => {
		if (
			userId &&
			formData.name.length > 0 &&
			formData.cv &&
			formData.linkedin.length > 0 &&
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

	const getUploadData = async (): Promise<GCSUploadData> => {
		if (!file) return

		const filename = encodeURIComponent(file.name)
		const res = await fetch(`/api/get-upload-url?file=${filename}`)
		const data = await res.json()
		const { url, fields, fileName } = data

		const gcsFormData = new FormData()

		Object.entries({ ...fields, file }).forEach(
			([key, value]: [key: any, value: any]) => {
				gcsFormData.append(key, value)
			}
		)

		return { url, gcsFormData, fileName }
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (
			!(
				userId &&
				formData.name.length > 0 &&
				formData.cv &&
				formData.linkedin.length > 0 &&
				formData.description.length > 0
			)
		)
			return

		setLoading(true)
		setMessage("Generating secure URL")

		// Get GCS upload data

		const gcsUploadData: GCSUploadData = await getUploadData()

		if (!gcsUploadData) {
			setSuccess(false)
			setLoading(false)
			setMessage("Error uploading CV")
			return
		}

		const { url, gcsFormData, fileName } = gcsUploadData

		// Upload to GCS

		setLoading(true)
		setMessage("Uploading CV")

		const resGCS = await fetch(url, {
			method: "POST",
			body: gcsFormData,
		})

		if (!resGCS.ok) {
			setSuccess(false)
			setLoading(false)
			setMessage("Error uploading CV")
			return
		}

		const encodedFileName = encodeURIComponent(fileName)

		// Upload to DB
		setMessage("Uploading to database")
		const res = await fetch(`/api/opportunities/${opportunityId}`, {
			method: "POST",
			body: JSON.stringify({
				...formData,
				cv: `https://storage.googleapis.com/bountree-pdf-bucket/${encodedFileName}`,
			}),
		})
		const json = await res.json()

		if (!res.ok) {
			setSuccess(false)
			setLoading(false)
			setMessage("Error uploading to database")
			return
		}
		setPost(json.opportunity.value)
		setLoading(false)
		setSuccess(true)
	}

	const handleOnClose = (
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => {
		if (loading) return
		e.preventDefault()
		e.stopPropagation()
		setModalOpen(false)
	}

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div
						onClick={handleOnClose}
						className="absolute inset-0 backdrop-blur-md  flex items-center justify-center"
					>
						{loading && (
							<>
								<Loader>
									<p className="text-white text-2xl mt-3">{message}</p>
								</Loader>
							</>
						)}
						{success === undefined && !loading && (
							<form
								onClick={(e) => e.stopPropagation()}
								className="text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center max-h-screen overflow-auto"
							>
								<div className="form-control w-full max-w-xs">
									<label htmlFor="name" className="label">
										<span className="label-text">
											Name<span className="text-red-500">*</span>
										</span>
									</label>
									<input
										required
										value={formData.name}
										name="name"
										onChange={handleChange}
										type="text"
										placeholder="Candidate's full name"
										className="input  bg-gray-100 shadow"
									/>
								</div>
								<div className="form-control w-full max-w-xs">
									<label htmlFor="cv" className="label">
										<span className="label-text">
											CV<span className="text-red-500">*</span>
										</span>
										<span className="label-text-alt rounded-full py-0.5 px-1.5 bg-warning">
											PDF only
										</span>
									</label>
									<input
										required
										name="cv"
										onChange={(e) => {
											handleChange(e)
											setFile(e.target.files![0])
										}}
										type="file"
										accept="application/pdf"
										className="file-input bg-gray-100 shadow"
									/>
								</div>
								<div className="form-control w-full max-w-xs">
									<label htmlFor="linkedin" className="label">
										<span className="label-text">
											LinkedIn<span className="text-red-500">*</span>
										</span>
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
									<label htmlFor="secondary" className="label">
										<span className="label-text">Secondary link</span>
									</label>
									<input
										value={formData.secondary}
										name="secondary"
										onChange={handleChange}
										type="text"
										placeholder="(Optional) GitHub, Behance, etc."
										className="input  bg-gray-100 shadow"
									/>
								</div>
								<div className="form-control w-full max-w-xs mb-4">
									<label htmlFor="description" className="label">
										<span className="label-text">
											Candidate description
											<span className="text-red-500">*</span>
										</span>
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
											? "btn-disabled"
											: "bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white",
										"btn mt-4"
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
									{applicationsRemaining
										? `Your candidate has been submitted. You can submit
									${applicationsRemaining} more candidate(s) to this position.`
										: `Your candidate has been submitted. You can not submit any more candidates to this position.`}
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
								{message && (
									<p className="text-center text-red-500 mt-4">{message}</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
