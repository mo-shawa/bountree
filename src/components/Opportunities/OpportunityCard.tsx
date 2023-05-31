import Image from 'next/image'
import Link from 'next/link'
import Pill from '../Misc/Pill'
import { classNames, formatCurrency } from '@/utils/misc'
import { PauseCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import IOpportunity from '@/types/opportunity'

export default function OpportunityCard({
	opportunity,
	className = '',
}: {
	opportunity: IOpportunity
	className?: string
}) {
	const { fixed, min, max, currency } = opportunity.salary

	const salary = fixed
		? formatCurrency(fixed, currency)
		: `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

	const statusPillLeft = (() => {
		if (['paused', 'closed'].includes(opportunity.status)) {
			return (
				<Pill
					className="hidden sm:block "
					type={opportunity.status === 'paused' ? 'yellow' : 'red'}
				>
					{opportunity.status}
				</Pill>
			)
		}
		if (opportunity.badge) {
			return (
				<Pill
					className="hidden sm:block "
					type={opportunity.badge.type}
				>
					{opportunity.badge.text}
				</Pill>
			)
		}
	})()
	const statusPillRight = (() => {
		if (opportunity.status === 'paused')
			return (
				<PauseCircleIcon className="block sm:hidden text-yellow-500 h-8 w-8 absolute bottom-1 right-1" />
			)

		if (opportunity.status === 'closed')
			return (
				<XCircleIcon className="block sm:hidden text-red-500 h-8 w-8 absolute bottom-1 right-1" />
			)

		// if (opportunity.badge)
		// 	return (
		// 		<Pill
		// 			className="block sm:hidden   text-red-500 absolute top-1 right-1"
		// 			type={opportunity.badge.type}
		// 		>
		// 			{opportunity.badge.text}
		// 		</Pill>
		// 	)
	})()

	return (
		<Link
			href={`/opportunities/${opportunity._id}`}
			className={classNames(
				'shadow-md w-full bg-white rounded-md flex flex-row justify-between items-center p-4 my-4 hover:-translate-y-1 transition-translate duration-300 ease-in-out relative text-black',
				opportunity.status === 'paused' || opportunity.status === 'closed'
					? 'opacity-60'
					: '',
				className
			)}
		>
			<div className="h-full flex justify-between w-full items-center relative">
				<div className="flex flex-col xs:flex-row gap-4">
					<Image
						className="rounded-md object-contain hidden xs:block"
						src={opportunity.company.image}
						alt="company logo"
						width={80}
						height={80}
					/>
					<div className="flex flex-col xs:justify-between gap-2">
						<div className="flex items-center gap-2 whitespace-nowrap text-ellipsis">
							<Image
								className="xs:hidden rounded-md object-contain h-8 w-8"
								src={opportunity.company.image}
								alt="company logo"
								width={80}
								height={80}
							/>
							<h4>{opportunity.company.name}</h4>
						</div>
						<div className="flex flex-wrap items-center gap-2 w-auto">
							<p className=" md:font-thin text-gray-500 m-0 max-w-[80%] sm:max-w-full ">
								{opportunity.title}
							</p>
							{statusPillLeft}
						</div>
						<div className="flex text-xs gap-2 text-gray-500">
							<p>{opportunity.remote ? 'Remote' : 'On-Site'}</p>•
							<p>{opportunity.location}</p>•<p>{salary}</p>
						</div>
					</div>
				</div>
				<div
					id="right"
					className="absolute right-0 "
				>
					<p className="text-xl">
						<div className="flex items-center">
							{/* <div className="shadow mr-2 bg-b-yellow rounded-full w-6 h-6 text-sm text-center font-bold">
								β
							</div> */}
							{formatCurrency(
								opportunity.reward.amount,
								opportunity.reward.currency
							)}
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
