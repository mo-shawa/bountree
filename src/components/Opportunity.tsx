import Image from "next/image"
import Link from "next/link"

export default function Opportunity(props: any) {
	return (
		<Link
			href={`/opportunities/${props.id}`}
			className="w-full bg-white rounded-md flex flex-row justify-between items-center p-4 my-4 hover:-translate-y-1 transition-translate duration-300 ease-in-out"
		>
			<div className="h-full flex justify-between w-full items-center">
				<div className="flex gap-4">
					<Image
						className="rounded-md"
						src={props.image}
						alt="company logo"
						width={80}
						height={80}
					/>
					<div className="flex flex-col justify-between">
						<div className="flex items-center gap-2 whitespace-nowrap text-ellipsis">
							<h4>{props.company}</h4>
							<p className="font-thin text-xs">{props.slogan}</p>
						</div>
						<p className="font-thin text-gray-500">{props.role.title}</p>
						<div className="hidden md:flex gap-2 text-xs font-thin text-gray-500">
							<p>{props.role.workFrom}</p>
							<span>•</span>
							<p>{props.role.location}</p>
							<span>•</span>
							<p>{props.role.salary}</p>
						</div>
					</div>
				</div>
				<div id="right">
					<p className="text-xl">
						{props.role.reward}{" "}
						<span className="text-xs font-thin text-gray-500">reward</span>
					</p>
				</div>
			</div>
		</Link>
	)
}
