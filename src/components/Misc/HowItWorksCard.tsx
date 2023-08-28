import {
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  LinkIcon,
} from "@heroicons/react/24/outline"
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
    icon?: JSX.Element
  }
} = {
  1: {
    numberStyle:
      "bg-gradient-to-r from-purple-300 to-pink-300 bg-purple-300 border-purple-200",
    radialGradientColor: "rgb(168, 85, 247, 0.15)",
    pillColor: "bg-gradient-to-r from-pink-300 to-purple-300 text-purple-900",
    icon: <LinkIcon className="h-8 w-8 text-black/50" />,
  },
  2: {
    numberStyle:
      "bg-gradient-to-r from-yellow-300 to-orange-300 bg-yellow-300 border-yellow-200",
    radialGradientColor: "rgb(234, 179, 8, 0.15)",
    pillColor: "bg-gradient-to-r from-yellow-300 to-orange-300 text-orange-900",
    icon: <ChatBubbleLeftRightIcon className="h-8 w-8 text-black/50" />,
  },
  3: {
    numberStyle:
      "bg-gradient-to-r from-green-300 to-lime-300 bg-green-300 border-green-200",
    radialGradientColor: "rgb(34, 197, 94, 0.15)",
    pillColor: "bg-gradient-to-r from-lime-300 to-green-300 text-green-900",
    icon: <CurrencyDollarIcon className="ml-0.5 h-8 w-8 text-black/50" />,
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
      className="group relative mx-auto mt-16 flex w-full max-w-xs flex-col items-center rounded-md bg-white px-4 pb-5 shadow"
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
        className={`flex h-20 w-20  -translate-y-1/2 items-center justify-center rounded-full  border-4 font-mono text-2xl font-bold  text-white ${stepStyles[step].numberStyle}`}
      >
        {stepStyles[step].icon ? stepStyles[step].icon : step}
      </div>
      <div
        className={`mb-3 flex  w-fit -translate-y-1/2 rounded-full px-4 py-0.5 text-xs  font-semibold sm:text-base ${stepStyles[step].pillColor}`}
      >
        <div>{pill}</div>
      </div>
      <p className="border-t p-4 text-center">{description}</p>
    </div>
  )
}
