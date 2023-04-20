import Image from "next/image"
import Link from "next/link"
import Pill from "./Misc/Pill"
import { formatCurrency } from "@/utils"

export default function Opportunity(props: any) {
	const { fixed, min, max, currency } = props.salary

	const salary = fixed
		? formatCurrency(fixed, currency)
		: `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

	const statusPillLeft =
		props.status === "paused" ? (
			<Pill classes="hidden sm:block " type="yellow">
				II Paused
			</Pill>
		) : null
	const statusPillRight =
		props.status === "paused" ? (
			<Pill classes="sm:hidden whitespace-nowrap" type="yellow">
				II Paused
			</Pill>
		) : null

	return (
		<Link
			href={`/opportunities/${props.id}`}
			className="w-full bg-white rounded-md flex flex-row justify-between items-center p-4 my-4 hover:-translate-y-1 transition-translate duration-300 ease-in-out"
		>
			<div className="h-full flex justify-between w-full items-center">
				<div className="flex gap-4">
					<Image
						className="rounded-md object-contain"
						src={props.image}
						alt="company logo"
						width={80}
						height={80}
					/>
					<div className="flex flex-col xs:justify-between gap-2">
						<div className="flex items-center gap-2 whitespace-nowrap text-ellipsis">
							<h4>{props.company}</h4>
							<p className="font-thin text-xs">{props.slogan}</p>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<p className="font-thin text-gray-500 m-0">{props.role.title}</p>
							{statusPillLeft}
						</div>
						<div className="hidden xs:flex gap-2 text-xs font-thin text-gray-500">
							<p>{props.role.workFrom}</p>
							<span>•</span>
							<p>{props.role.location}</p>
							<span>•</span>
							<p>{salary}</p>
						</div>
					</div>
				</div>
				<div id="right">
					<p className="text-xl">
						{props.role.reward}
						<span className="text-xs font-thin text-gray-500 hidden sm:block">
							reward
						</span>
					</p>
					{statusPillRight}
				</div>
			</div>
		</Link>
	)
}
