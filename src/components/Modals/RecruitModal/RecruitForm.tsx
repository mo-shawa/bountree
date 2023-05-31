import { classNames } from '@/utils/misc'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

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
			className="text-black bg-white border border-neutral px-5 py-10 rounded w-screen max-w-sm  flex flex-col items-center max-h-screen overflow-auto relative "
		>
			<XCircleIcon
				onClick={() => setModalOpen(false)}
				className="h-6 rounded-full shadow w-6 absolute top-2 right-2 cursor-pointer text-gray-700 hover:shadow-lg transition-shadow"
			/>

			{currentStep}

			<div className="btn-group justify-self-end  mt-8">
				{!isFirstStep && (
					<button
						type="button"
						onClick={back}
						className="btn shadow bg-gray-200 text-black hover:bg-gray-300 hover:text-black"
					>
						Back
					</button>
				)}
				<button
					type="submit"
					className={classNames(
						currentStepIndex === 3 && disabled
							? 'btn-disabled'
							: 'bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white',
						'btn shadow'
					)}
				>
					{isLastStep ? 'Submit Candidate' : 'Next'}
				</button>
			</div>
			<span className="badge badge-ghost shadow absolute bottom-2 right-2">
				Step {currentStepIndex + 1} of 4
			</span>
		</form>
	)
}
