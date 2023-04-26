import { useState } from "react"
import ArrowButton from "./Misc/ArrowButton"

export default function JobDescriptionGenerator() {
	const [formData, setFormData] = useState({
		email: "",
		jobTitle: "",
		tone: "Professional",
	})

	function handleChange(e: any) {
		setFormData(() => ({ ...formData, [e.target.name]: e.target.value }))
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		console.log(formData)

		const query = new URLSearchParams(formData).toString()
		console.log(query)
		const res = await fetch("/api/ai/generate-job-description?" + query)

		const data = await res.json()
		console.log(data)
	}

	return (
		<div className="flex flex-col gap-5 p-5 bg-gray-500 rounded ">
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
					<option>Zoomer</option>
					<option>Old English</option>
					<option>Peaky Blinders</option>
				</select>
			</div>
			<button onClick={(e) => handleSubmit(e)} className="btn">
				Generate
			</button>
		</div>
	)
}
