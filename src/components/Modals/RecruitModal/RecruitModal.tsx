import { useState, useEffect } from "react"
import { classNames } from "@/utils"
import IApplication from "@/types/Application"
import IOpportunity from "@/types/Opportunity"
import { Loader } from "../../Loader/Loader"
import { useSession } from "next-auth/react"
import { getGCSUploadData } from "@/utils/cloudStorage"
import RecruitForm from "./RecruitForm"
import Success from "./Success"
import Failure from "./Failure"

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
	const { data: session } = useSession()

	const [formData, setFormData] = useState<Partial<IApplication>>({
		userId: session?.user?.id,
		opportunityId,
		name: "",
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
		formData.cv &&
		formData.linkedin?.length! > 0 &&
		formData.description?.length! > 0 &&
		checkboxChecked

	useEffect(() => {
		if (conditionsMet) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [formData, userId, checkboxChecked])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!conditionsMet) return

		setLoading(true)
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
		setPost(json.opportunity)
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
							<RecruitForm
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
