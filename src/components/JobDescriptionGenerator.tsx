import { useState, useEffect } from "react"
import { classNames, isEmail } from "@/utils"
import CountdownTimer from "./Misc/CountdownTimer"

export default function JobDescriptionGenerator() {
	const [formData, setFormData] = useState({
		email: "",
		jobTitle: "",
		tone: "Professional",
	})
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [displayResponse, setDisplayResponse] = useState("")
	const [submitDisabled, setSubmitDisabled] = useState(true)

	useEffect(() => {
		if (!message) return

		let i = 0

		const intervalId = setInterval(() => {
			setDisplayResponse(message.slice(0, i))

			i += 7

			if (i > message.length) {
				clearInterval(intervalId)
			}
		}, 40)

		return () => clearInterval(intervalId)
	}, [message])

	useEffect(() => {
		if (isEmail(formData.email) && formData.jobTitle) {
			setSubmitDisabled(false)
		} else {
			setSubmitDisabled(true)
		}
	}, [formData])

	function handleChange(e: any) {
		setFormData(() => ({ ...formData, [e.target.name]: e.target.value }))
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		if (submitDisabled || loading) return
		if (!formData.email || !formData.jobTitle) return
		setDisplayResponse("")

		setLoading(true)
		console.log(formData)

		const query = new URLSearchParams(formData).toString()
		console.log(query)

		const res = await fetch("/api/ai/generate-job-description?" + query)

		const data = await res.json()
		console.log(data)
		setMessage(data.choices[0].message.content)
		setLoading(false)
	}

	return (
		<div className="flex flex-col md:flex-row w-full rounded gap-2 h-min">
			<Form
				loading={loading}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				submitDisabled={submitDisabled}
				formData={formData}
			/>
			<div className="bg-white text-black w-full p-5 rounded relative ">
				<textarea
					className="textarea textarea-ghost resize-none w-full"
					name="output"
					cols={40}
					rows={10}
					value={displayResponse}
				></textarea>
				{loading && <CountdownTimer />}{" "}
			</div>
		</div>
	)
}

type FormProps = {
	handleChange: (e: any) => void
	handleSubmit: (e: any) => void
	loading?: boolean
	submitDisabled?: boolean
	formData: {
		email: string
		jobTitle: string
		tone: string
	}
}

function Form({
	handleChange,
	handleSubmit,
	loading,
	submitDisabled,
	formData,
}: FormProps) {
	return (
		<div className="flex flex-col gap-5 p-5 bg-white text-black rounded">
			<label
				className="form-control
  "
			>
				<span>
					Email<span className="text-red-500">*</span>
				</span>
				<input
					name="email"
					onChange={handleChange}
					type="text"
					placeholder="info@site.com"
					className="input input-bordered text-black"
				/>
			</label>
			<label
				className="form-control
  "
			>
				<span>Job title</span>
				<input
					name="jobTitle"
					onChange={handleChange}
					type="text"
					placeholder="Next.js Developer"
					className="input input-bordered text-black"
				/>
			</label>
			<div className="form-control w-full max-w-xs">
				<span>Desired tone</span>
				<select
					name="tone"
					onChange={handleChange}
					className="select select-bordered text-black"
				>
					<option selected>Professional</option>
					<option>Casual</option>
					<option>Creative</option>
					<option>Playful</option>
					<option>Surfer</option>
					<option>Sarcastic</option>
					<option>Old English</option>
					<option>Peaky Blinders</option>
				</select>
			</div>

			<button
				onClick={(e) => handleSubmit(e)}
				className={classNames(
					"btn relative",
					submitDisabled ? "btn-disabled" : "",
					loading ? "loading" : ""
				)}
			>
				{loading ? "Loading" : "Generate"}
			</button>
		</div>
	)
}
