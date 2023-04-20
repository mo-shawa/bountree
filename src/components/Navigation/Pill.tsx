import { classNames } from "@/utils"

type PillProps = {
	children: React.ReactNode
	classes?: string
	type?: "blue" | "green" | "red" | "yellow"
}

const pillColors = {
	blue: "bg-blue-300 text-blue-800 border border-blue-800",
	green: "bg-green-300 text-green-800 border border-green-800 ",
	red: "bg-red-300 text-red-800 border border-red-800 ",
	yellow: "bg-yellow-300 text-yellow-800 border border-yellow-800 ",
}

export default function Pill({ children, type = "blue", classes }: PillProps) {
	return (
		<>
			<span
				className={classNames(
					"rounded-xl ml-2 px-2 m-auto py-0.5 text-xs",
					pillColors[type],
					classes ? classes : ""
				)}
			>
				{children}
			</span>
		</>
	)
}
