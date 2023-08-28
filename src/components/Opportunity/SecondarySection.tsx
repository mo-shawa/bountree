import IOpportunity from "@/types/opportunity"

type Props = {
	post: IOpportunity
	isSharing?: boolean
}

export default function SecondarySection({ post, isSharing = false }: Props) {
	return (
		<div>
			<div className="pb-5 md:py-6">
				<h1 className="text-xl text-left text-b-yellow font-semibold">Role Description</h1>
				<p className=" max-w-2xl my-4 text-justify ">{post.description}</p>
			</div>
			<div className="pb-5 md:py-6">
				<h1 className="text-xl text-left text-b-yellow font-semibold">The Ideal Candidate</h1>
				<p className=" max-w-2xl my-4 text-justify ">{post.idealCandidate}</p>
			</div>
			{isSharing && (
				<div className="py-6 ">
					<h1 className="text-xl text-left text-b-yellow font-semibold">
						Position Requirements
					</h1>

					<ul className="list-disc md:ml-14 ml-5 ">
						{post.requirements.map((item: string, i: number) => {
							return (
								<li key={i} className="my-4">
									{item}
								</li>
							)
						})}
					</ul>
				</div>
			)}
			<div className="py-6 ">
				<h1 className="text-xl text-left text-b-yellow font-semibold">Role Perks</h1>
				{post.perks.description && (
					<p className=" max-w-2xl my-4 ">{post.perks.description}</p>
				)}
				{post.perks.items.length > 0 ? (
					<ol className="list-decimal md:ml-14 ml-5 ">
						{post.perks.items.map((item: string, i: number) => {
							return (
								<li key={i} className="my-4">
									{item}
								</li>
							)
						})}
					</ol>
				) : (
					<p className=" max-w-2xl my-4 ">No perks listed</p>
				)}
			</div>
		</div>
	)
}
