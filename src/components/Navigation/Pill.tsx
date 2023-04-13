import { classNames } from "@/utils"

type PillProps = {
	children: React.ReactNode
	classes?: string
}

export default function Pill({ children, classes }: PillProps) {
	return (
		<span
			className={classNames(
				"rounded-xl ml-2 bg-blue-300 text-blue-800  px-2 text-xs",
				classes ? classes : ""
			)}
		>
			{children}
		</span>
	)
}
