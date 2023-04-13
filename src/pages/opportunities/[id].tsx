import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import IOpportunity from "../../types/Opportunity"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Loader from "@/components/Loader/Loader"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { classNames } from "@/utils"

export default function PostDetail() {
	const router = useRouter()
	const { id } = router.query

	const { data: session, status } = useSession()

	const [post, setPost] = useState<IOpportunity>()
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
			console.log(data)

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

	// const applicationsRemaining = 5 - post.applications.filter(a => a.recruiter === session.user._id).length

	return (
		<Layout classNames="bg-b-blue-dark flex justify-center">
			<section className="px-4 text-white max-w-7xl w-full">
				<Top post={post} />
				<PrimarySection post={post} />
				<SecondarySection post={post} />
				{post.rejectionFeedback && post.rejectionFeedback.length && (
					<FeedbackSection post={post} />
				)}
			</section>
		</Layout>
	)
}

function Top({ post }: { post: IOpportunity }) {
	return (
		<div className="w-full  text-white flex flex-row justify-between items-center mt-12 pb-10 border-b">
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
						<p className="text-md sm:text-lg">{post.title}</p>
						<h4 className="uppercase  text-sm text-b-yellow ">
							{post.company.name}
						</h4>

						<p className="flex gap-2 text-xs  text-b-yellow">
							{post.remote ? "Remote" : "In Office"} - {post.location}
						</p>
					</div>
				</div>
				<div className="flex flex-row gap-4 md:gap-10 w-max items-center">
					<Link
						className="group rounded border p-2 whitespace-nowrap hover:bg-white/10 transition-colors float-left"
						href="/opportunities"
					>
						All Opportunities
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							className="inline ml-1.5 w-2.5 fill-white hover transition-colors group-hover:fill-b-yellow"
						>
							<path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path>
						</svg>
					</Link>
					<a
						target="_blank"
						className="h-12 w-12 hover:bg-white/10 transition-colors rounded-full p-2 "
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
			</div>
		</div>
	)
}

function PrimarySection({ post }: { post: IOpportunity }) {
	return (
		<div className="grid grid-cols-6 border-b pb-10 md:pb-0 md:border-b-0">
			<div className="col-span-6 md:col-span-4 py-5 md:border-b">
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
			<div className="col-span-6 md:col-span-2 border rounded-xl mt-6  mx-auto md:mx-0 md:w-auto w-full max-w-sm md:ml-10 flex flex-col justify-between p-5">
				<div>
					<div className="flex items-center py-5 border-b">
						<h1 className="text-2xl mr-3 ">
							{post.reward.amount.toLocaleString("en-US", {
								style: "currency",
								currency: post.reward.currency,
							})}
						</h1>
						<p className=" text-b-yellow">reward</p>
					</div>
					<p className="mt-5 font-thin">Position responsibilities:</p>
					<ul className=" list-disc mx-4 xl:mx-8">
						{post.responsibilities.map((item: string, i: number) => {
							return (
								<li key={i} className="my-4">
									{item}
								</li>
							)
						})}
					</ul>
				</div>
				<a
					target="_blank"
					className={classNames(
						post.status == "open" ? "disabled" : "",
						"flex"
					)}
					href={post.applyLink}
				>
					<button className=" bg-b-yellow text-black font-bold py-2 w-full max-w-xs rounded mx-auto shadow-lg shadow-b-yellow/30 transition-shadow hover:shadow-b-yellow/50 hover:shadow-xl">
						RECRUIT
					</button>
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
		<div className="grid grid-cols-6 border-b">
			<div className="col-span-6 md:col-span-4 py-5 ">
				<h1 className="text-xl text-left text-b-yellow">Role Perks</h1>
				{post.perks.description && (
					<p className=" max-w-2xl my-4 ">{post.perks.description}</p>
				)}
				<ol className="list-decimal md:ml-14 ml-5 ">
					{post.perks.items.map((item: string, i: number) => {
						return (
							<li key={i} className=" text-sm my-4">
								{item}
							</li>
						)
					})}
				</ol>
			</div>
			<div className="md:ml-10 col-span-6 md:col-span-2 pb-5 md:py-5">
				<h1 className="text-xl text-left text-b-yellow">The Ideal Candidate</h1>
				<p className=" max-w-2xl my-4 text-justify ">{post.idealCandidate}</p>
			</div>
		</div>
	)
}

function FeedbackSection({ post }: { post: IOpportunity }) {
	return (
		<div className="pb-10">
			<div className="col-span-6 md:col-span-4 py-5 ">
				<h1 className="text-xl text-left text-b-yellow">Rejection Feedback</h1>
				<p className=" max-w-2xl my-4 ">
					To increase your chances of success, we recommend reviewing feedback
					from previous candidates who were not selected for the role to gain a
					better understanding of the requirements.
				</p>
			</div>
			<p className="my-5">*SECTION WILL ONLY SHOW IF THERE IS FEEDBACK*</p>
			<div className="flex justify-between gap-5 flex-wrap">
				<FeedbackItem post={post} />
				<FeedbackItem post={post} />
			</div>
		</div>
	)
}

function FeedbackItem({ post }: { post: IOpportunity }) {
	return (
		<div className="flex flex-col  py-5 w-full md:w-5/12 ">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 rounded-full bg-gray-200"></div>
				<div className="flex flex-col">
					<p className="text-lg">John Doe</p>
					<p className="">3 days ago</p>
				</div>
			</div>
			<p className="mt-3">
				Dude sux Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Repellendus tenetur ipsa, tempore error odit totam omnis, perferendis
				est blanditiis
			</p>
		</div>
	)
}
