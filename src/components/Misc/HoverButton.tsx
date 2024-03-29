import Link from "next/link"
import { motion } from "framer-motion"

type Props = {
  children?: React.ReactNode
  href?: string
  onClick?: () => void
  target?: string
  className?: string
  type?: ButtonType
}

type ButtonType = "primary" | "secondary" | "green" | "outline"

const buttonType = {
  primary: {
    outer: "bg-purple-500 text-white hover:shadow-purple-300",
    inner: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  secondary: {
    outer: "bg-yellow-500 text-white hover:shadow-yellow-300",
    inner: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  green: {
    outer: "bg-green-500 text-white hover:shadow-green-300",
    inner: "bg-gradient-to-r from-green-500 to-lime-500",
  },

  outline: {
    outer: "bg-neutral-50 text-black hover:shadow-gray-300",
    inner: "bg-neutral-100",
  },
} as const

export default function HoverButton({
  onClick,
  href,
  target,
  children,
  className,
  type = "primary",
}: Props) {
  return (
    <motion.button
      whileTap={{
        scale: 0.95,
      }}
    >
      <Link
        href={href || "#"}
        target={target || "_self"}
        onClick={onClick}
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md px-8  py-2 font-medium shadow-lg transition-all  duration-500 ease-in-out hover:shadow-xl ${className}	${buttonType[type].outer}`}
      >
        <span
          className={`absolute h-0 w-0 rounded-full transition-all duration-500 ease-in-out group-hover:h-72 group-hover:w-72 ${buttonType[type].inner}`}
        ></span>

        <span className="relative whitespace-nowrap">{children}</span>
      </Link>
    </motion.button>
  )
}
