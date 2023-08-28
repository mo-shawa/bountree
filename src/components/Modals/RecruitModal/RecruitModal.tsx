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
import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import Step1 from "./steps/Step1"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"

type Props = {
  userId: string
  opportunityId: string
  setModalOpen: (open: boolean) => void
  setPost: (post: IOpportunity) => void
  applicationsRemaining: number
  setApplicationsRemaining: (prev: number) => void
  requirements: string[]
}

export default function RecruitModal({
  userId,
  opportunityId,
  setModalOpen,
  applicationsRemaining,
  setApplicationsRemaining,
  requirements,
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
  const [checkedState, setCheckedState] = useState(
    new Array(requirements.length + 1).fill(false)
  )

  const conditionsMet =
    userId &&
    file &&
    formData.name?.length! > 0 &&
    isEmail(formData.candidateEmail as string) &&
    formData.cv &&
    isURL(formData.linkedin as string) &&
    formData.description?.length! > 0 &&
    checkedState.every((checked) => checked === true)

  useEffect(() => {
    if (conditionsMet) {
      if (formData.secondary && !isURL(formData.secondary))
        return setDisabled(true)
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [formData, userId, checkedState, conditionsMet])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  const { currentStep, currentStepIndex, next, back, isFirstStep, isLastStep } =
    useMultiStepForm([
      <Step1
        key={0}
        formData={formData}
        file={file}
        handleChange={handleChange}
        setFile={setFile}
      />,
      <Step2 key={1} formData={formData} handleChange={handleChange} />,
      <Step3
        key={2}
        checkedState={checkedState}
        name={formData.name.split(" ")[0]}
        handleCheckboxChange={handleCheckboxChange}
      />,
      <Step4
        key={3}
        checkedState={checkedState}
        requirements={requirements}
        name={formData.name.split(" ")[0]}
        handleCheckboxChange={handleCheckboxChange}
      />,
    ])

  // Definitely better doing this with a reducer 🤷‍♂️
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLastStep) return next()

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
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            onClick={handleOnClose}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-md"
          >
            {loading && (
              <Loader>
                <p className=" mt-3 text-2xl">{message}</p>
              </Loader>
            )}
            {success === undefined && !loading && (
              <RecruitForm
                currentStepIndex={currentStepIndex}
                currentStep={currentStep}
                setModalOpen={setModalOpen}
                handleSubmit={handleSubmit}
                disabled={disabled}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                back={back}
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
