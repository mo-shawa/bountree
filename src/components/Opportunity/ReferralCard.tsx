import IOpportunity from '@/types/opportunity'
import { classNames } from '@/utils/misc'
import Pill from '../Misc/Pill'
import Link from 'next/link'
import { ShareIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
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
	const [shareLink] = useState<string>(
		`${window.location.origin}/opportunities/${post._id}/share`
	)

	const [clipboardTooltipText, setClipboardTooltipText] =
		useState<string>('Copy to Clipboard')

	return (
		<div
			className={classNames(
				'h-min col-span-6 lg:col-span-2 border rounded-xl lg:mt-12 mx-auto lg:mx-0 lg:w-auto w-full max-w-sm  flex flex-col justify-between p-5 bg-white text-b-blue-dark',
				mobile ? 'flex lg:hidden mb-10' : 'hidden lg:flex'
			)}
		>
			<div className="mb-4">
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

					<div className="dropdown dropdown-bottom dropdown-end">
						<div
							data-tip="Share Externally"
							className="tooltip tooltip-left"
						>
							<label
								tabIndex={0}
								className="btn btn-circle btn-sm bg-transparent hover:bg-gray-200 text-gray-500 hover:text-gray-700 "
							>
								<ShareIcon className="fill-current h-4 " />
							</label>
						</div>
						<div className="card">
							<ul
								tabIndex={0}
								className="dropdown-content card-body p-2 shadow-2xl bg-base-100 rounded-box "
							>
								<li>
									<div className="form-control mb-2">
										<label className="input-group">
											<input
												type="text"
												className="input input-bordered"
												value={shareLink}
											/>
											<button
												onClick={() => {
													navigator.clipboard.writeText(shareLink)
													setClipboardTooltipText('Copied!')
												}}
												data-tip={clipboardTooltipText}
												className="btn input-group-btn tooltip tooltip-left normal-case"
											>
												<ClipboardDocumentIcon className="fill-current h-4 " />
											</button>
										</label>
									</div>
								</li>
								<li>
									<div className="form-control">
										<a
											target="_blank"
											className=" btn btn-block border btn-success gap-2 p-2 normal-case"
											href={`https://wa.me/?text=${encodeURIComponent(
												`${post.company.name} is hiring a ${post.title}. Check it out!\n ${shareLink}`
											)}`}
										>
											<svg
												fill="#ffffff"
												height="16px"
												width="16px"
												version="1.1"
												id="Layer_1"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 308 308"
												stroke="#ffffff"
											>
												<g
													id="SVGRepo_bgCarrier"
													strokeWidth="0"
												></g>
												<g
													id="SVGRepo_tracerCarrier"
													strokeLinecap="round"
													strokeLinejoin="round"
												></g>
												<g id="SVGRepo_iconCarrier">
													<g id="XMLID_468_">
														<path
															id="XMLID_469_"
															d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
														></path>
														<path
															id="XMLID_470_"
															d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
														></path>
													</g>
												</g>
											</svg>
											Share on WhatsApp
										</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
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
