import { useState, useEffect } from "react"
import { Loader } from "./Loader/Loader"

export default function JobDescriptionGenerator() {
	const [formData, setFormData] = useState({
		email: "",
		jobTitle: "",
		tone: "Professional",
	})
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [displayResponse, setDisplayResponse] = useState("")
	const [completedTyping, setCompletedTyping] = useState(false)

	useEffect(() => {
		setCompletedTyping(false)
		if (!message) return

		let i = 0

		const intervalId = setInterval(() => {
			setDisplayResponse(message.slice(0, i))

			i++

			if (i > message.length) {
				clearInterval(intervalId)
				setCompletedTyping(true)
			}
		}, 12)

		return () => clearInterval(intervalId)
	}, [message])

	function handleChange(e: any) {
		setFormData(() => ({ ...formData, [e.target.name]: e.target.value }))
	}

	async function handleSubmit(e: any) {
		e.preventDefault()

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
		<div className="flex justify-stretch w-full  rounded">
			<Form
				loading={loading}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			<div className="bg-white text-black w-full p-5">
				<span className="whitespace-pre-wrap">
					{displayResponse}
					{!completedTyping && (
						<svg
							viewBox="8 4 8 16"
							xmlns="http://www.w3.org/2000/svg"
							className="cursor"
						>
							<rect x="10" y="6" width="4" height="12" fill="#000" />
						</svg>
					)}
				</span>
			</div>
		</div>
	)
}

type FormProps = {
	handleChange: (e: any) => void
	handleSubmit: (e: any) => void
	loading?: boolean
}

function Form({ handleChange, handleSubmit, loading }: FormProps) {
	return (
		<div className="flex flex-col gap-5 p-5 bg-gray-500 ">
			<h1 className="text-xl">Job Description Generator</h1>
			<label
				className="form-control
  "
			>
				<span>Email</span>
				<input
					name="email"
					onChange={handleChange}
					type="text"
					placeholder="info@site.com"
					className="input input-bordered"
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
					className="input input-bordered"
				/>
			</label>
			<div className="form-control w-full max-w-xs">
				<span>Desired tone</span>
				<select
					name="tone"
					onChange={handleChange}
					className="select select-bordered text-gray-400"
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
			{loading ? (
				<Loader absolute={false} />
			) : (
				<button onClick={(e) => handleSubmit(e)} className="btn relative">
					Generate
				</button>
			)}
		</div>
	)
}
