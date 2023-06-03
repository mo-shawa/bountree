import Link from "next/link"
import ArrowSVG from "./ArrowSVG"

type Props = {
	children?: React.ReactNode
	href?: string
	onClick?: () => void
	target?: string
	className?: string
}

export default function ArrowButton({
	onClick,
	href,
	target,
	children,
	className,
}: Props) {
	return (
		<Link
			className={`mt-6 flex items-center w-fit cursor-pointer rounded-lg bg-gradient-to-br from-purple-300 to-pink-300 px-4 py-1.5 text-base hover:bg-gradient-to-tr transition-colors ${className}`}
			onClick={onClick}
			href={href || "#"}
			target={target || "_self"}
		>
			<div className="my-auto mr-2 text-lg text-white">{children}</div>
			<ArrowSVG className="m-0 p-0 fill-white" />
		</Link>
	)
}
