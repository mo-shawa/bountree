import { ReactElement, useState } from 'react'

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	const currentStep = steps[currentStepIndex]

	const isFirstStep = currentStepIndex === 0
	const isLastStep = currentStepIndex === steps.length - 1

	function next() {
		if (isLastStep) return currentStepIndex
		setCurrentStepIndex(currentStepIndex + 1)
	}

	function back() {
		if (isFirstStep) return currentStepIndex
		setCurrentStepIndex(currentStepIndex - 1)
	}

	function goToStep(stepIndex: number) {
		if (stepIndex < 0 || stepIndex >= steps.length) return currentStepIndex
		setCurrentStepIndex(stepIndex)
	}

	return {
		currentStep,
		next,
		back,
		goToStep,
		isLastStep,
		isFirstStep,
		currentStepIndex,
	}
}
