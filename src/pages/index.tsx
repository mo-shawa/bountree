import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/Layout/Layout"
import { useSession } from "next-auth/react"
import ArrowSVG from "@/components/Misc/ArrowSVG"
import ArrowButton from "@/components/Misc/ArrowButton"
import { useEffect, useState } from "react"
import OpportunityCard from "@/components/Opportunities/OpportunityCard"
import { Loader } from "@/components/Loader/Loader"
import IOpportunity from "@/types/opportunity"
import { wait } from "@/utils/misc"
import Floaters from "@/components/Misc/Floaters"
import HoverButton from "@/components/Misc/HoverButton"

export default function Home() {
	const { status } = useSession()
	const [latestOpportunities, setLatestOpportunities] = useState([])

	useEffect(() => {
		const fetchLatestOpportunities = async () => {
			await wait()
			const res = await fetch("/api/opportunities/latest")
			const { data } = await res.json()
			setLatestOpportunities(data)
		}
		fetchLatestOpportunities()
	}, [])

	return (
		<Layout classNames="bg-white text-b-blue-dark ">
			<section className=" flex flex-col justify-center items-center overflow-hidden md:overflow-visible mt-28">
				<div className="grid lg:grid-cols-2 py-12 w-full max-w-7xl px-4 mt-20 sm:mt-0">
					<div className=" flex flex-col items-center lg:items-start justify-center z-10">
						<Link href="/product">
							<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full bg-gray-100 px-4 py-0.5 hover:bg-purple-200 transition-colors duration-500">
								<div>
									Are you a startup? Hire with{" "}
									<span className="font-bold">bountree!</span>
								</div>
								<ArrowSVG className="fill-purple-500" />
							</div>
						</Link>
						<h1 className="lg:text-left text-center text-5xl md:text-5xl font-bold">
							Get paid to refer <br /> top talent.
						</h1>
						<div className=" mt-6 w-full text-center lg:text-left text-lg leading-snug md:w-2/3 ">
							Why refer candidates to startups for free when you can earn
							rewards with <span className="font-bold">bountree?</span>
						</div>
						<div className="flex gap-4 flex-wrap items-center justify-center">
							<HoverButton
								type="secondary"
								href="/opportunities"
								className="mt-6"
							>
								{status === "authenticated"
									? "Current opportunities"
									: "Start referring now"}
							</HoverButton>

							<HoverButton
								href="/opportunities"
								className="mt-6"
								type="outline"
							>
								Learn more
							</HoverButton>
						</div>
					</div>
					<div className="h-full relative  mt-10">
						<Floaters />
						<Image
							src="/static/hero.png"
							alt="hero image"
							width={500}
							height={500}
							className="mx-auto relative"
						/>

						{/* {latestOpportunities.length ? (
							latestOpportunities.map((opportunity: IOpportunity, index) => (
								<OpportunityCard
									key={opportunity.id}
									opportunity={opportunity}
									className={
										index !== 1
											? "scale-75 shadow-none"
											: "scale-[0.85] shadow-none"
									}
								/>
							))
						) : (
							<Loader />
						)} */}
					</div>
				</div>
				<div className="w-full max-w-7xl p-4 z-10">
					<p className="text-center md:text-left">
						Help the most disruptive startups find talent
					</p>
					<div className="grid grid-cols-2 md:grid-cols-8 max-w-5xl gap-4 mt-4 gap-y-8">
						<Image
							src="/static/product/coinmena.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/pluto.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/krews.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/clara.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/stake-logo 1.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/zest.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/khwarizmi.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
						<Image
							src="/static/product/syarah.png"
							alt="company logo"
							width={150}
							height={150}
							className="h-full w-full object-contain max-h-6"
						/>
					</div>
				</div>
			</section>

			<section id="details" className="mx-4 py-12 ">
				<div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto relative">
					<div>
						<div className="min-h-[50vh] flex flex-col justify-center items-center lg:items-start">
							<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5 bg-gradient-to-r from-orange-300 to-pink-300 text-orange-900 font-semibold">
								<div>The deets</div>
							</div>
							<h1 className="text-5xl font-bold mb-4">How it works</h1>
							<p className="text-lg text-center lg:text-left">
								<span className="font-bold">βountree</span> connects top talent
								with innovative startups looking to hire. As a recruiter on our
								platform, you have the freedom to work when you want and earn as
								much as you want. The sky&apos;s the limit.
							</p>
						</div>
						<div className="min-h-[50vh] flex flex-col justify-center items-center lg:items-start py-28">
							<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 text-yellow-900 font-semibold">
								<div>The Tech</div>
							</div>
							<h1 className="text-5xl font-bold mb-4">Recruit like a pro</h1>
							<p className="text-lg text-center lg:text-left">
								<span className="font-bold">βountree</span> connects top talent
								with innovative startups looking to hire. As a recruiter on our
								platform, you can earn rewards by referring candidates to
								opportunities.
							</p>
						</div>
						<div className="min-h-[50vh] flex flex-col justify-center items-center lg:items-start py-28">
							<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 text-yellow-900 font-semibold">
								<div>The Tech</div>
							</div>
							<h1 className="text-5xl font-bold mb-4">Recruit like a pro</h1>
							<p className="text-lg text-center lg:text-left">
								<span className="font-bold">βountree</span> connects top talent
								with innovative startups looking to hire. As a recruiter on our
								platform, you can earn rewards by referring candidates to
								opportunities.
							</p>
						</div>
					</div>
					<div className="h-screen flex items-center sticky top-0">
						<Image
							src="/static/opportunity-detail.jpg"
							height={460}
							width={937}
							alt="Opportunity Detail"
							className="rounded-lg shadow-md shadow-gray-500 "
						/>
					</div>
				</div>
				<div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
					<Image
						src="/static/opportunity-detail.jpg"
						height={460}
						width={937}
						alt="Opportunity Detail"
						className="rounded-lg shadow-md shadow-gray-500"
					/>
					<div className="flex flex-col justify-center items-center lg:items-start py-28">
						<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 text-yellow-900 font-semibold ">
							<div>More stuff</div>
						</div>
						<h1 className="text-5xl font-bold mb-4">Part two</h1>
						<p className="text-lg text-center lg:text-left">
							<span className="font-bold">βountree</span> connects top talent
							with innovative startups looking to hire. As a recruiter on our
							platform, you can earn rewards by referring candidates to
							opportunities.
						</p>
					</div>
				</div>

				{/* <div className="mx-auto my-12 py-8 bg-white w-full max-w-7xl">
					<div className="p-5 mx-auto max-w-4xl text-center">
						<div className="text-xs mx-auto sm:text-base mb-3 flex w-fit rounded-full bg-purple-100 text-purple-500 px-4 py-0.5 font-semibold">
							Refer a friend and earn
						</div>
						<h1 className="md:text-5xl  text-4xl  text-center font-bold mb-8">
							Your network is your net worth... <br /> earn bounties by tapping
							into it.
						</h1>
						<p className="mb-10 text-lg text-justify">
							<span className="font-bold">βountree</span> connects top talent
							with innovative startups looking to hire. As a recruiter on our
							platform, you have the freedom to work when you want and earn as
							much as you want. The sky&apos;s the limit.
						</p>
						<Image
							src="/static/opportunity-detail.jpg"
							height={460}
							width={937}
							alt="Opportunity Detail"
							className="rounded-lg shadow-md shadow-gray-500"
						/>
					</div>
				</div>
				<div className="px-5 mx-auto my-12 py-12 bg-gray-200 w-full max-w-7xl  rounded-lg grid md:grid-cols-2 gap-4 shadow">
					<div className=" text-b-blue-dark flex flex-col gap-4">
						<h3 className="text-3xl font-bold ">Recruit like a pro</h3>
						<h4 className="font-semibold max-w-sm text-2xl ">
							We&apos;ve built the tools and resources you need to excel as a
							recruiter and find the perfect matches.
						</h4>
						<p className="text-xl text-gray-500 mb-13">
							βountree&apos;s recruiter tools help you succeed at every stage of
							the interview process.
						</p>
					</div>
					<Image
						className=" md:inline m-auto"
						src="/static/dashboard.png"
						width={538}
						height={307}
						alt="leads"
					/>
				</div>
				<div className="mx-auto my-12 w-full max-w-7xl  rounded-lg">
					<div className="grid grid-cols-2 gap-12 md:gap-4">
						<div className="col-span-2 md:col-span-1 shadow bg-b-lavender  py-6 px-6 rounded-lg">
							<h3 className="text-3xl font-bold mb-5">Less is more.</h3>
							<p className="text-lg">
								Our platform prioritizes simplicity to enhance the user
								experience. Join βountree and start earning in your first week
								by working on your own terms, with startups that interest you
								and make the most of your time.
							</p>
						</div>
						<div className="col-span-2 md:col-span-1 shadow bg-gray-200  py-6 px-6 rounded-lg">
							<h3 className="text-3xl font-bold mb-5">No secrets here.</h3>
							<p className="text-lg">
								It&apos;s time to empower recruiters.{" "}
								<span className="font-bold">βountree</span> let&apos;s you
								unlock your full potential with clarity at every step. Startups
								share their needs transparently with recruiters, who can
								communicate directly with hiring managers.
							</p>
						</div>
					</div>
				</div> */}
			</section>

			{/* <section className="mx-4 pt-12 pb-28 mb- flex flex-col items-center justify-center text-center">
				<h1 className="text-5xl font-bold ">
					Get paid for knowing the right people
				</h1>
				<p className=" my-6 text-xl max-w-xl">
					Find great talent and get paid for it - it&apos;s a win-win with our
					bounty recruitment program.
				</p>

				<HoverButton href="/opportunities">
					{status === "authenticated"
						? "Current Opportunities"
						: "Start Recruiting Now"}
				</HoverButton>
			</section> */}
		</Layout>
	)
}
