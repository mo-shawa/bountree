import { useMotionValue, motion, useMotionTemplate } from "framer-motion"

type HowItWorksCardProps = {
	step: number
	pill: string
	description: string
}

const stepStyles: {
	[key: number]: {
		numberStyle: string
		radialGradientColor: string
		pillColor: string
	}
} = {
	1: {
		numberStyle:
			"bg-gradient-to-r from-purple-300 to-pink-300 bg-purple-300 border-purple-200",
		radialGradientColor: "rgb(168, 85, 247, 0.15)",
		pillColor: "bg-gradient-to-r from-pink-300 to-purple-300 text-purple-900",
	},
	2: {
		numberStyle:
			"bg-gradient-to-r from-yellow-300 to-orange-300 bg-yellow-300 border-yellow-200",
		radialGradientColor: "rgb(234, 179, 8, 0.15)",
		pillColor: "bg-gradient-to-r from-yellow-300 to-orange-300 text-orange-900",
	},
	3: {
		numberStyle:
			"bg-gradient-to-r from-green-300 to-lime-300 bg-green-300 border-green-200",
		radialGradientColor: "rgb(34, 197, 94, 0.15)",
		pillColor: "bg-gradient-to-r from-lime-300 to-green-300 text-green-900",
	},
}

export default function HowItWorksCard({
	step,
	pill,
	description,
}: HowItWorksCardProps) {
	let mouseX = useMotionValue(0)
	let mouseY = useMotionValue(0)

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		let { left, top } = currentTarget.getBoundingClientRect()
		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}

	return (
		<div
			onMouseMove={handleMouseMove}
			className="group relative flex flex-col items-center mt-16 pb-5 px-4 rounded-md shadow w-full max-w-xs bg-white mx-auto"
		>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${stepStyles[step].radialGradientColor},
              transparent 80%
            )
          `,
				}}
			/>
			<div
				className={`w-20 h-20 rounded-full  flex items-center justify-center -translate-y-1/2  text-white font-mono text-2xl border-4  font-bold ${stepStyles[step].numberStyle}`}
			>
				{step}
			</div>
			<div
				className={`text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5  font-semibold -translate-y-1/2 ${stepStyles[step].pillColor}`}
			>
				<div>{pill}</div>
			</div>
			<p className="text-center border-t p-4">{description}</p>
		</div>
	)
}
