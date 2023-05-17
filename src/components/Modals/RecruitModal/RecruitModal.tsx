import { useState, useEffect } from "react"
import IApplication from "@/types/application"
import IOpportunity from "@/types/opportunity"
import { Loader } from "../../Loader/Loader"
import { useSession } from "next-auth/react"
import { getGCSUploadData } from "@/utils/cloudStorage"
import RecruitForm from "./RecruitForm"
import Success from "./Success"
import Failure from "./Failure"
import { isURL, isEmail } from "@/utils/misc"

type Props = {
	userId: string
	opportunityId: string
	setModalOpen: (open: boolean) => void
	setPost: (post: IOpportunity) => void
	applicationsRemaining: number
	setApplicationsRemaining: (prev: number) => void
}

export default function RecruitModal({
	userId,
	opportunityId,
	setModalOpen,
	setPost,
	applicationsRemaining,
	setApplicationsRemaining,
}: Props) {
	const { data: session } = useSession()

	const [formData, setFormData] = useState<Partial<IApplication>>({
		userId: session?.user?.id,
		opportunityId,
		name: "",
		candidateEmail: "",
		cv: "",
		linkedin: "",
		secondary: "",
		description: "",
	})

	const [file, setFile] = useState<File>()
	const [disabled, setDisabled] = useState(true)
	const [success, setSuccess] = useState<boolean>()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [checkboxChecked, setCheckboxChecked] = useState(false)

	const conditionsMet =
		userId &&
		file &&
		formData.name?.length! > 0 &&
		isEmail(formData.candidateEmail as string) &&
		formData.cv &&
		isURL(formData.linkedin as string) &&
		formData.description?.length! > 0 &&
		checkboxChecked

	useEffect(() => {
		if (conditionsMet) {
			if (formData.secondary && !isURL(formData.secondary))
				return setDisabled(true)
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [formData, userId, checkboxChecked, conditionsMet])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!conditionsMet) return

		setLoading(true)
		setMessage("Validating Candidate")

		// Check if candidate LinkedIn has been used before
		const resLinkedIn = await fetch(
			`/api/opportunities/${opportunityId}/validate-candidate/${encodeURIComponent(
				formData.linkedin as string
			)}/${encodeURIComponent(formData.candidateEmail as string)}`
		)

		const linkedInUsed = await resLinkedIn.json()
		console.log({ resLinkedIn, linkedInUsed })
		// const linkedInUsed = true
		if (linkedInUsed.application) {
			setSuccess(false)
			setLoading(false)
			setMessage("Candidate has already been submitted. ")
			return
		}
		setMessage("Generating secure URL")

		// Get GCS upload data
		const gcsUploadData = await getGCSUploadData(file)

		if (!gcsUploadData) {
			setSuccess(false)
			setLoading(false)
			setMessage("Error uploading CV")
			return
		}

		// Upload to GCS
		setMessage("Uploading CV")
		const { url, gcsFormData, fileName } = gcsUploadData
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

		// Upload to DB
		setMessage("Uploading to database")
		const encodedFileName = encodeURIComponent(fileName)
		const res = await fetch(`/api/applications/`, {
			method: "POST",
			body: JSON.stringify({
				...formData,
				cv: `https://storage.googleapis.com/bountree-pdf-bucket/${encodedFileName}`,
			}),
		})
		const json = await res.json()

		console.log(json)

		if (!res.ok) {
			setSuccess(false)
			setLoading(false)
			setMessage("Error uploading to database")
			return
		}
		setLoading(false)
		setSuccess(true)
		setApplicationsRemaining(applicationsRemaining - 1)
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
							<RecruitForm
								setModalOpen={setModalOpen}
								formData={formData}
								setFile={setFile}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								disabled={disabled}
								checkboxChecked={checkboxChecked}
								setCheckboxChecked={setCheckboxChecked}
							/>
						)}

						{success && (
							<Success
								applicationsRemaining={applicationsRemaining}
								handleOnClose={handleOnClose}
							/>
						)}

						{success === false && (
							<Failure handleOnClose={handleOnClose} message={message} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
