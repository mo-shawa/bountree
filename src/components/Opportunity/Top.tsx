import IOpportunity from "@/types/opportunity"
import Image from "next/image"
import { formatCurrency } from "@/utils/misc"

export default function Top({ post }: { post: IOpportunity }) {
	const { fixed, min, max, currency } = post.salary

	const salary = fixed
		? formatCurrency(fixed, currency)
		: `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

	return (
		<div className="w-full h-min col-span-6 lg:col-span-4 flex flex-row justify-between items-center mt-12 mb-10 ">
			<div className="h-full gap-8 flex flex-col sm:flex-row justify-between items-center w-full">
				<div className="flex gap-4 w-full">
					<Image
						className="shadow rounded-md aspect-square object-cover"
						src={post.company.image}
						alt="company logo"
						width={80}
						height={80}
					/>
					<div className="flex flex-col justify-between">
						<h4 className="uppercase text-sm text-b-yellow font-semibold">
							{post.company.name}
						</h4>
						<p className="text-lg">{post.title}</p>

						<p className=" text-xs">
							{post.remote ? "Remote" : "In Office"} - {post.location} -{" "}
							<span className="text-b-yellow font-semibold">{salary}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
