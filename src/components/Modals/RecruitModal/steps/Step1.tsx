import React, { ChangeEvent } from 'react'
import IApplication from '@/types/application'
import { useRef, useEffect } from 'react'

type Props = {
	formData: Partial<IApplication>
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	setFile: (file: File) => void
	file: File | undefined
}

export default function Step1({
	formData,
	handleChange,
	setFile,
	file,
}: Props) {
	return (
		<>
			<h1 className="text-2xl mb-4">Basic Information 🥱</h1>

			<div className="form-control w-full max-w-xs">
				<label
					htmlFor="name"
					className="label"
				>
					<span className="label-text">
						Name<span className="text-red-500">*</span>
					</span>
				</label>
				<input
					autoFocus
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
				<label
					htmlFor="candidateEmail"
					className="label"
				>
					<span className="label-text">
						Candidate Email<span className="text-red-500">*</span>
					</span>
				</label>
				<input
					required
					value={formData.candidateEmail}
					name="candidateEmail"
					onChange={handleChange}
					type="email"
					placeholder="candidate@email.com"
					className="input  bg-gray-100 shadow"
				/>
			</div>

			<div className="form-control w-full max-w-xs">
				<label
					htmlFor="cv"
					className="label"
				>
					<span className="label-text">
						CV<span className="text-red-500">*</span>
					</span>
					<span className="label-text-alt rounded-full py-0.5 px-1.5 bg-warning">
						PDF only
					</span>
				</label>

				{file ? (
					<div className="alert alert-success shadow-lg rounded-md">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
							<span>CV Submitted!</span>
					</div>
				) : (
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
				)}
			</div>
		</>
	)
}
