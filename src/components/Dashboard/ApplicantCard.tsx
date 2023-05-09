import IApplication from "@/types/application"
import { classNames, formatCurrency } from "@/utils/misc"
import ArrowSVG from "../Misc/ArrowSVG"
import { statusStyle } from "@/utils/misc"

type Props = IApplication & {
	open: boolean
}

export default function ApplicantCard({
	createdAt,
	name,
	cv,
	opportunityId,
	status,
	opportunity,
	description,
	secondary,
	linkedin,
	open,
	rejectionFeedback,
}: Props) {
	const { fixed, min, max, currency } = opportunity!.salary

	const salary = fixed
		? formatCurrency(fixed, currency)
		: `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

	const buttonStyles =
		"btn bg-b-blue-dark text-white shadow hover:bg-blue-500 hover:text-white border-white/10  hover:border-transparent transition-all duration-300 ease-in-out text-sm font-normal"

	return (
		<div className="shadow w-full bg-white rounded-md border p-4 pb-0 hover:border-blue-500 hover:shadow-md transition-all duration-300 ease-in-out focus-within:border-blue-500">
			<div className="w-full  flex flex-row justify-between items-center ">
				<div className="h-full flex justify-between w-full items-center">
					<div className="flex gap-4">
						<div className="font-thin text-xs flex flex-col xs:justify-between gap-2">
							<a
								href={`/opportunities/${opportunityId}`}
								className="flex items-center gap-2 whitespace-nowrap text-ellipsis hover:text-blue-500"
							>
								<p>{opportunity?.title}</p>-<p>{opportunity?.company.name}</p>
							</a>
							<div className="flex flex-wrap items-center gap-2">
								<p className="font-bold text-black text-lg m-0">{name}</p>
							</div>
							<div className="flex gap-2 text-xs font-thin text-gray-500 hover:text-blue">
								<p>Applied {new Date(createdAt).toLocaleDateString()}</p>-
								<a href={cv as string}>
									<p className="font-medium hover:text-blue-500 flex items-center group">
										View CV
										<ArrowSVG className="fill-blue-500 group-hover:fill-black" />
									</p>
								</a>
							</div>
							{status === "rejected" && rejectionFeedback && (
								<div className="flex flex-col gap-2 mt-2">
									<p className="text-xs font-thin text-gray-500">
										Rejection Feedback
									</p>
									<p className="text-sm font-medium text-black">
										{rejectionFeedback}
									</p>
								</div>
							)}
						</div>
					</div>
					<div className="w-24">
						<span className="text-xs font-thin text-gray-500 flex items-center gap-3 ">
							<div
								className={classNames(
									"h-2 w-2 rounded-full",
									statusStyle[status]
								)}
							></div>
							{status}
						</span>
					</div>
				</div>
			</div>
			<div
				className={classNames(
					open ? "collapse-open pb-4" : "",
					"collapse mt-4 border-t collapse-arrow rounded-b p-0 hover:text-blue-500 focus:text-blue-500 transition-colors duration-300 ease-in-out"
				)}
			>
				<input tabIndex={0} type="checkbox" className="peer" />
				<div className=" collapse-title text-md font-medium px-0 peer-checked:text-blue-500 ">
					Details
				</div>
				<div className="collapse-content p-0 flex flex-col gap-4 ">
					{/* Candidate details */}
					<hr />
					<div className="flex flex-col gap-1">
						<p className="text-xs font-thin text-gray-500">Reward</p>
						<p className="text-lg font-medium text-black underline">
							{formatCurrency(opportunity?.reward.amount)}
						</p>
					</div>
					<div className="flex flex-wrap gap-x-12 gap-y-4">
						<div className="flex flex-col gap-1">
							<p className="text-xs font-thin text-gray-500">Date Posted</p>
							<p className="text-sm font-medium text-black">
								{new Date(opportunity?.createdAt!).toDateString()}
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-xs font-thin text-gray-500">Category</p>
							<p className="text-sm font-medium text-black">
								{opportunity?.category}
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-xs font-thin text-gray-500">Position Salary</p>
							<p className="text-sm font-medium text-black">{salary}</p>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-xs font-thin text-gray-500">Location</p>
							<p className="text-sm font-medium text-black">
								{opportunity?.location}
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-xs font-thin text-gray-500">Work from</p>
							<p className="text-sm font-medium text-black">
								{opportunity?.remote ? "Remote" : "Office"}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-xs font-thin text-gray-500">
							Candidate's Description
						</p>
						<p className="text-sm font-medium text-black text-justify">
							{description}
						</p>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-xs font-thin text-gray-500">
							Position's Ideal Candidate
						</p>
						<p className="text-sm font-medium text-black text-justify">
							{opportunity?.idealCandidate}
						</p>
					</div>

					<hr />

					<div className="mx-auto btn-group btn-group-vertical lg:btn-group-horizontal">
						<a
							target="_blank"
							href={linkedin as string}
							className={buttonStyles}
						>
							LinkedIn
						</a>
						<a target="_blank" href={cv as string} className={buttonStyles}>
							View Resume
						</a>
						{secondary && (
							<a target="_blank" href={secondary} className={buttonStyles}>
								Secondary Link
							</a>
						)}
						<a
							href={`/opportunities/${opportunityId}`}
							className={buttonStyles}
						>
							View Job Posting
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
