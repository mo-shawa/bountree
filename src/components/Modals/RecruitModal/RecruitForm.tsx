import { classNames } from "@/utils/misc"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { ReactElement } from "react"

type Props = {
  disabled: boolean
  handleSubmit: (e: React.FormEvent) => Promise<number | undefined>
  setModalOpen: (open: boolean) => void
  currentStep: ReactElement
  currentStepIndex: number
  isFirstStep: boolean
  isLastStep: boolean
  back: () => void
}

export default function RecruitForm({
  disabled,
  handleSubmit,
  setModalOpen,
  currentStep,
  currentStepIndex,
  isFirstStep,
  isLastStep,
  back,
}: Props) {
  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
      className="relative flex max-h-screen w-screen max-w-sm flex-col items-center overflow-auto rounded  border border-neutral bg-white px-5 py-10 text-black "
    >
      <XCircleIcon
        onClick={() => setModalOpen(false)}
        className="absolute right-2 top-2 h-6 w-6 cursor-pointer rounded-full text-gray-700 shadow transition-shadow hover:shadow-lg"
      />

      {currentStep}

      <div className="btn-group mt-8  justify-self-end">
        {!isFirstStep && (
          <button
            type="button"
            onClick={back}
            className="btn bg-gray-200 text-black shadow hover:bg-gray-300 hover:text-black"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className={classNames(
            currentStepIndex === 3 && disabled
              ? "btn-disabled"
              : "bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white",
            "btn shadow"
          )}
        >
          {isLastStep ? "Submit Candidate" : "Next"}
        </button>
      </div>
      <span className="badge badge-ghost absolute bottom-2 right-2 shadow">
        Step {currentStepIndex + 1} of 4
      </span>
    </form>
  )
}
