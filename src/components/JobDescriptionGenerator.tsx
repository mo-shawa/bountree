import { useState, useEffect } from "react"
import { classNames, isEmail } from "@/utils/misc"
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

    const query = new URLSearchParams(formData).toString()

    const res = await fetch("/api/ai/generate-job-description?" + query)

    const data = await res.json()
    setMessage(data.choices[0].message.content)
    setLoading(false)
  }

  return (
    <div className="flex h-min w-full flex-col gap-2 rounded border md:flex-row">
      <Form
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitDisabled={submitDisabled}
        formData={formData}
      />
      <div className="relative w-full rounded bg-gray-50 p-5 text-black ">
        <textarea
          className="textarea-ghost textarea w-full resize-none"
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
    <div className="flex flex-col gap-5 rounded bg-white p-5 text-black">
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
          className="input-bordered input text-black"
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
          className="input-bordered input text-black"
        />
      </label>
      <div className="form-control w-full">
        <span>Desired tone</span>
        <select
          name="tone"
          onChange={handleChange}
          className="select-bordered select w-full text-black"
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
