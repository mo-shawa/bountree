import Image from "next/image"
import Link from "next/link"
import Pill from "../Misc/Pill"
import { classNames, formatCurrency } from "@/utils/misc"
import { PauseCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"

export default function OpportunityCard(props: any) {
	const { fixed, min, max, currency } = props.salary

	const salary = fixed
		? formatCurrency(fixed, currency)
		: `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

	const statusPillLeft = ["paused", "closed"].includes(props.status) ? (
		<Pill
			className="hidden sm:block "
			type={props.status === "paused" ? "yellow" : "red"}
		>
			{props.status}
		</Pill>
	) : null
	const statusPillRight = ["paused", "closed"].includes(props.status) ? (
		props.status === "paused" ? (
			<PauseCircleIcon className="block sm:hidden text-yellow-500 h-8 w-8 absolute bottom-1 right-1" />
		) : (
			<XCircleIcon className="block sm:hidden text-red-500 h-8 w-8 absolute bottom-1 right-1" />
		)
	) : null

	return (
		<Link
			href={`/opportunities/${props.id}`}
			className={classNames(
				"shadow-md w-full bg-white rounded-md flex flex-row justify-between items-center p-4 my-4 hover:-translate-y-1 transition-translate duration-300 ease-in-out relative",
				props.status === "paused" || props.status === "closed"
					? "opacity-60"
					: ""
			)}
		>
			<div className="h-full flex justify-between w-full items-center relative">
				<div className="flex flex-col xs:flex-row gap-4">
					<Image
						className="rounded-md object-contain hidden xs:block"
						src={props.image}
						alt="company logo"
						width={80}
						height={80}
					/>
					<div className="flex flex-col xs:justify-between gap-2">
						<div className="flex items-center gap-2 whitespace-nowrap text-ellipsis">
							<Image
								className="xs:hidden rounded-md object-contain h-8 w-8"
								src={props.image}
								alt="company logo"
								width={80}
								height={80}
							/>
							<h4>{props.company}</h4>
							<p className="font-thin text-xs">{props.slogan}</p>
						</div>
						<div className="flex flex-wrap items-center gap-2 w-auto">
							<p className=" md:font-thin text-gray-500 m-0 max-w-[80%] sm:max-w-full ">
								{props.role.title}
							</p>
							{statusPillLeft}
						</div>
						<div className="flex gap-2 text-xs sm:font-thin text-gray-500">
							<p>{props.role.workFrom}</p>
							<span>•</span>
							<p>{props.role.location}</p>
							<span>•</span>
							<p>{salary}</p>
						</div>
					</div>
				</div>
				<div id="right" className="absolute right-0 ">
					<p className="text-xl">
						<div className="flex items-center">
							{/* <div className="shadow mr-2 bg-b-yellow rounded-full w-6 h-6 text-sm text-center font-bold">
								β
							</div> */}
							{props.role.reward}
						</div>
						<span className="text-xs sm:font-thin text-gray-500 block text-right">
							reward
						</span>
					</p>
				</div>
			</div>
			{statusPillRight}
		</Link>
	)
}
