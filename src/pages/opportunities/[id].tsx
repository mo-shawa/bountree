import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import IOpportunity from "../../types/opportunity"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Loader from "@/components/Loader/Loader"
import { signIn } from "next-auth/react"
import { classNames } from "@/utils/misc"
import RecruitModal from "@/components/Modals/RecruitModal/RecruitModal"
import { formatCurrency } from "@/utils/misc"
import Pill from "@/components/Misc/Pill"

export default function PostDetail() {
	const router = useRouter()
	const { id } = router.query as { id: string }

	const { data: session, status } = useSession()

	const [post, setPost] = useState<IOpportunity>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [error, setError] = useState<string>()

	useEffect(() => {
		async function fetchPost() {
			const res = await fetch(`/api/opportunities/${id}`)
			const data = await res.json()

			if (!res.ok || data.success === false) {
				setError(
					"An error occurred while loading the post. Please try again in a few minutes."
				)
				return
			}

			setPost(data.opportunity)
		}

		if (router.isReady) fetchPost()
	}, [id, router.isReady])

	if (status === "loading") return <Loader />

	if (status === "unauthenticated" || session === null) {
		signIn("", { callbackUrl: window.location.href })
	}

	if (error) {
		return (
			<Layout classNames="bg-b-blue-dark flex justify-center">
				<div className="py-10 bg-white rounded flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<h1 className="text-xl mx-auto rounded-full">{error}</h1>
				</div>
			</Layout>
		)
	}

	if (!post) return <Loader />

	const applicationsRemaining =
		(session?.user.applicationLimit || 5) -
		post.applications.filter((a) => a.userId === session?.user._id).length

	return (
		<Layout classNames="bg-b-blue-dark flex justify-center">
			<section className="px-4 text-white max-w-7xl w-full grid grid-cols-6 ">
				<PrimarySection
					post={post}
					applicationsRemaining={applicationsRemaining}
					setModalOpen={setModalOpen}
				/>
				<ReferralCard
					post={post}
					applicationsRemaining={applicationsRemaining}
					setModalOpen={setModalOpen}
				/>
				{modalOpen && (
					<RecruitModal
						opportunityId={id}
						userId={session?.user.id}
						setModalOpen={setModalOpen}
						setPost={setPost}
						applicationsRemaining={applicationsRemaining}
					/>
				)}
			</section>
		</Layout>
	)
}

function PrimarySection({
	post,
	applicationsRemaining,
	setModalOpen,
}: {
	post: IOpportunity
	applicationsRemaining: number
	setModalOpen: (open: boolean) => void
}) {
	const hasRejectionFeedback = post.applications.some(
		(a) => a.status === "rejected" && a.rejectionFeedback
	)
	return (
		<div className="col-span-6 lg:col-span-4">
			<Top post={post} />
			<ReferralCard
				mobile={true}
				post={post}
				applicationsRemaining={applicationsRemaining}
				setModalOpen={setModalOpen}
			/>
			<SecondarySection post={post} />
			<CompanySection post={post} />
			{hasRejectionFeedback && <FeedbackSection post={post} />}
		</div>
	)
}

function Top({ post }: { post: IOpportunity }) {
	const { fixed, min, max, currency } = post.salary

	const salary = fixed
		? formatCurrency(fixed, currency)
		: `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

	return (
		<div className="w-full h-min col-span-6 lg:col-span-4  text-white flex flex-row justify-between items-center mt-12 mb-10 ">
			<div className="h-full gap-8 flex flex-col sm:flex-row justify-between items-center w-full">
				<div className="flex gap-4 w-full">
					<Image
						className="rounded-md aspect-square object-cover"
						src={post.company.image}
						alt="company logo"
						width={80}
						height={80}
					/>
					<div className="flex flex-col justify-between">
						<h4 className="uppercase  text-sm text-b-yellow ">
							{post.company.name}
						</h4>
						<p className="text-lg">{post.title}</p>

						<p className=" text-xs">
							{post.remote ? "Remote" : "In Office"} - {post.location} -{" "}
							<span className="text-b-yellow">{salary}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

function ReferralCard({
	post,
	applicationsRemaining,
	setModalOpen,
	mobile = false,
}: {
	post: IOpportunity
	applicationsRemaining: number
	setModalOpen: (open: boolean) => void
	mobile?: boolean
}) {
	return (
		<div
			className={classNames(
				"h-min col-span-6 lg:col-span-2 border rounded-xl lg:mt-12 mx-auto lg:mx-0 lg:w-auto w-full max-w-sm  flex flex-col justify-between p-5 bg-white text-b-blue-dark",
				mobile ? "flex lg:hidden mb-10" : "hidden lg:flex"
			)}
		>
			<div>
				<div className="flex justify-between items-center pb-3  border-b">
					<div className="flex items-center py-3 ">
						<h1 className="text-2xl font-bold mr-3 ">
							{post.reward.amount.toLocaleString("en-US", {
								style: "currency",
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
								"en-US",
								{
									style: "currency",
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
							<li key={i} className="my-4">
								{item}
							</li>
						)
					})}
				</ul>
			</div>

			<button
				onClick={
					applicationsRemaining && post.status === "open"
						? () => setModalOpen(true)
						: () => null
				}
				className={classNames(
					applicationsRemaining > 0 && post.status === "open"
						? "bg-b-yellow"
						: "disabled",
					"btn text-black hover:text-white"
				)}
			>
				{applicationsRemaining > 0 && post.status === "open"
					? `Refer (${applicationsRemaining} remaining)`
					: `Applications ${post.status === "paused" ? "Paused" : "Closed"}`}
			</button>
		</div>
	)
}

function CompanySection({ post }: { post: IOpportunity }) {
	return (
		<div className="col-span-6 lg:col-span-4 py-6">
			<h1 className="text-xl text-left text-b-yellow">
				About {post.company.name}
			</h1>
			<p className="max-w-2xl my-4  ">{post.description}</p>
			<div className="grid max-w-xl grid-cols-2 gap-4 grid-rows-2 py-10 ">
				<GridIcon
					text={post.company.employees + " Employees"}
					icon="/static/svg/opportunity/people.svg"
				/>
				<GridIcon
					text={post.company.founded}
					icon="/static/svg/opportunity/birthday.svg"
				/>
				<GridIcon
					text={post.company.industry}
					icon="/static/svg/opportunity/industry.svg"
				/>
				<a
					className="hover:bg-white/10 rounded transition-colors"
					target="_blank"
					href={post.company.url}
				>
					<GridIcon text="Website" icon="/static/svg/all-roles.svg" />
				</a>
			</div>
		</div>
	)
}

function GridIcon({ icon, text }: { icon: string; text: string }) {
	return (
		<div className="col-span-1 row-span-2 md:row-span-1 flex items-center gap-4 p-4 ">
			<Image src={icon} width={34} height={34} alt={icon} />
			<h4 className="text-sm ">{text}</h4>
		</div>
	)
}

function SecondarySection({ post }: { post: IOpportunity }) {
	return (
		<div>
			<div className="pb-5 md:py-6">
				<h1 className="text-xl text-left text-b-yellow">The Ideal Candidate</h1>
				<p className=" max-w-2xl my-4 text-justify ">{post.idealCandidate}</p>
			</div>
			<div className="py-6 ">
				<h1 className="text-xl text-left text-b-yellow">Role Perks</h1>
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

function FeedbackSection({ post }: { post: IOpportunity }) {
	const applicationsWithFeedback = post.applications.filter(
		(app) => app.rejectionFeedback
	)
	return (
		<div className="pb-10">
			<div className="col-span-6 lg:col-span-4 py-6 ">
				<h1 className="text-xl text-left text-b-yellow">Rejection Feedback</h1>
				<p className=" max-w-2xl my-4 ">
					To increase your chances of success, we recommend reviewing feedback
					from previous candidates who were not selected for the role to gain a
					better understanding of the requirements.
				</p>
			</div>
			<ul className="list-disc md:ml-14 ml-5 ">
				{applicationsWithFeedback.map((app, i) => (
					<li key={app._id as string} className="my-4">
						{`Candidate #${i + 1}: ${app.rejectionFeedback}`}
					</li>
				))}
			</ul>
		</div>
	)
}
