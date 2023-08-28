import IApplication from "@/types/application"
import React, { ChangeEvent } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

type Props = {
  formData: Partial<IApplication>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function Step2({ formData, handleChange }: Props) {
  return (
    <>
      <h1 className="mb-4 text-2xl">More Info 🧐</h1>

      <div className="form-control w-full max-w-xs">
        <label htmlFor="linkedin" className="label">
          <span className="label-text">
            LinkedIn<span className="text-red-500">*</span>
          </span>
          <div
            className="tooltip tooltip-left"
            data-tip="Example: https://linkedin.com/in/user "
          >
            <InformationCircleIcon className="h-5 w-5 text-gray-600" />
          </div>
        </label>
        <input
          autoFocus
          required
          value={formData.linkedin}
          name="linkedin"
          onChange={handleChange}
          type="text"
          pattern="^http[s]?:\/\/(www\.)?linkedin\.com\/(in|pub|public-profile\/in|public-profile\/pub)\/(.*)$"
          placeholder="Candidate's LinkedIn Profile"
          className="input  bg-gray-100 shadow"
        />
      </div>
      {/* <div className="form-control w-full max-w-xs my-4">
				<label
					htmlFor="secondary"
					className="label"
				>
					<span className="label-text">Secondary link</span>
					<div
						className="tooltip tooltip-left"
						data-tip="Example: https://github.com/user "
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
			</div> */}
      <div className="form-control mb-4 w-full max-w-xs">
        <label htmlFor="description" className="label">
          <span className="label-text">
            Candidate description
            <span className="text-red-500">*</span>
          </span>
        </label>
        <textarea
          value={formData.description}
          name="description"
          required
          minLength={50}
          onChange={handleChange}
          placeholder="What makes this candidate stand out?"
          className="textarea h-24 resize-none  bg-gray-100 shadow"
        />
      </div>
    </>
  )
}
