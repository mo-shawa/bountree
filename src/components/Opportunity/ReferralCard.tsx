import IOpportunity from '@/types/opportunity'
import { classNames } from '@/utils/misc'
import Pill from '../Misc/Pill'
import Image from 'next/image'
import Link from 'next/link'

export default function ReferralCard({
	post,
	applicationsRemaining,
	setModalOpen,
	mobile = false,
	isAdmin,
}: {
	post: IOpportunity
	applicationsRemaining: number
	setModalOpen: (open: boolean) => void
	mobile?: boolean
	isAdmin?: boolean
}) {
	return (
		<div
			className={classNames(
				'h-min col-span-6 lg:col-span-2 border rounded-xl lg:mt-12 mx-auto lg:mx-0 lg:w-auto w-full max-w-sm  flex flex-col justify-between p-5 bg-white text-b-blue-dark',
				mobile ? 'flex lg:hidden mb-10' : 'hidden lg:flex'
			)}
		>
			<div>
				<div className="flex justify-between items-center pb-3  border-b">
					<div className="flex items-center py-3 ">
						<h1 className="text-2xl font-bold mr-3 ">
							{post.reward.amount.toLocaleString('en-US', {
								style: 'currency',
								currency: post.reward.currency,
							})}
						</h1>
						<Pill type="green">reward</Pill>
					</div>
					<a
						target="_blank"
						className="tooltip tooltip-left h-12 w-12 border hover:bg-b-lavender transition-colors rounded-full p-2 "
						data-tip="Share to WhatsApp"
						href={`https://wa.me/?text=${encodeURIComponent(
							`Check out this recruiting opportunity on Bountree - the reward is ${post.reward.amount.toLocaleString(
								'en-US',
								{
									style: 'currency',
									currency: post.reward.currency,
								}
							)}!\n https://bountree.app/opportunities/${post._id}`
						)}`}
					>
						<Image
							src="/static/svg/opportunity/share.svg"
							alt="share to whatsapp"
							height={32}
							width={32}
						/>
					</a>
				</div>
				<p className="mt-5 font-bold">Position requirements:</p>
				<ul className=" list-disc mx-4 xl:mx-8">
					{post.requirements.map((item: string, i: number) => {
						return (
							<li
								key={i}
								className="my-4"
							>
								{item}
							</li>
						)
					})}
				</ul>
			</div>

			<button
				onClick={
					applicationsRemaining && post.status === 'open'
						? () => setModalOpen(true)
						: () => null
				}
				className={classNames(
					applicationsRemaining > 0 && post.status === 'open'
						? 'bg-b-yellow  hover:text-white'
						: 'disabled cursor-not-allowed',
					'btn text-black'
				)}
			>
				{applicationsRemaining > 0 && post.status === 'open'
					? `Refer (${applicationsRemaining} remaining)`
					: `Applications ${post.status === 'paused' ? 'Paused' : 'Closed'}`}
			</button>

			{isAdmin && (
				<Link
					href={`/admin/opportunities/${post._id}`}
					className="btn  btn-success mt-4"
				>
					<button>Edit Opportunity</button>
				</Link>
			)}
		</div>
	)
}
