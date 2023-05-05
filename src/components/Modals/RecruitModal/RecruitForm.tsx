import type IApplication from "@/types/application"
import { classNames } from "@/utils/misc"
import { InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

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
	setModalOpen: (open: boolean) => void
}

export default function RecruitForm({
	formData,
	setFile,
	disabled,
	handleChange,
	checkboxChecked,
	setCheckboxChecked,
	handleSubmit,
	setModalOpen,
}: Props) {
	return (
		<form
			onClick={(e) => e.stopPropagation()}
			className="text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center max-h-screen overflow-auto relative"
		>
			<XCircleIcon
				onClick={() => setModalOpen(false)}
				className="h-6 w-6 absolute top-2 right-2 cursor-pointer text-gray-700"
			/>
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
						<InformationCircleIcon className="h-5 w-5 text-gray-600" />
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
						<InformationCircleIcon className="h-5 w-5 text-gray-600" />
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
					className="textarea shadow h-24  bg-gray-100 resize-none"
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
