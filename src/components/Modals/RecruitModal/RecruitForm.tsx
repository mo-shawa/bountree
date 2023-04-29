import type IApplication from "@/types/Application"
import { classNames } from "@/utils"

type Props = {
	formData: Partial<IApplication>
	setFile: (file: File) => void
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	checkboxChecked: boolean
	setCheckboxChecked: (checked: boolean) => void
	handleSubmit: (e: React.FormEvent) => void
	disabled: boolean
}

export default function RecruitForm({
	formData,
	setFile,
	disabled,
	handleChange,
	checkboxChecked,
	setCheckboxChecked,
	handleSubmit,
}: Props) {
	return (
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
					<div
						className="tooltip tooltip-left"
						data-tip="https://linkedin.com/in/user "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 stroke-gray-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
					</div>
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
					<div
						className="tooltip tooltip-left"
						data-tip="https://github.com/user "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 stroke-gray-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
					</div>
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

			<div className="form-control">
				<label className="label cursor-pointer px-4">
					<input
						value={checkboxChecked ? "on" : "off"}
						type="checkbox"
						className="checkbox mr-4"
						onChange={(e) => setCheckboxChecked(e.target.checked)}
					/>
					<span className="label-text text-left">
						I confirm the candidate is aware I am recommending them for this
						position.
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
				Submit Candidate
			</button>
		</form>
	)
}
