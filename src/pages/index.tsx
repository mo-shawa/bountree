import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout/Layout'
import { useSession } from 'next-auth/react'
import ArrowSVG from '@/components/Misc/ArrowSVG'
import ArrowButton from '@/components/Misc/ArrowButton'
import { useEffect, useState } from 'react'
import OpportunityCard from '@/components/Opportunities/OpportunityCard'
import { Loader } from '@/components/Loader/Loader'
import IOpportunity from '@/types/opportunity'
import { wait } from '@/utils/misc'
import Floaters from '@/components/Misc/Floaters'

export default function Home() {
	const { status } = useSession()
	const [latestOpportunities, setLatestOpportunities] = useState([])

	useEffect(() => {
		const fetchLatestOpportunities = async () => {
			await wait()
			const res = await fetch('/api/opportunities/latest')
			const { data } = await res.json()
			setLatestOpportunities(data)
		}
		fetchLatestOpportunities()
	}, [])

	return (
		<Layout classNames="bg-slate-50 text-b-blue-dark">
			<section className=" flex flex-col justify-center items-center ">
				<div className="grid md:grid-cols-2 py-12 w-full max-w-7xl px-4">
					<div className=" flex flex-col items-center md:items-start justify-start ">
						<div className="bg-white  mb-3 flex w-fit rounded-full border border-neutral-500 px-4 py-0.5">
							<div>Looking for talent?</div>
							<Link href="/product">
								<div className="group ml-2 flex items-center cursor-pointer">
									<div className="text-base font-semibold group-hover:text-blue group-hover:underline flex  items-center h-full">
										Explore
										<ArrowSVG />
									</div>
								</div>
							</Link>
						</div>
						<h1 className="md:text-left text-center text-5xl md:text-5xl font-bold">
							Get rewarded for <br /> recruiting top talent.
						</h1>
						<div className=" mt-6 w-full text-center md:text-left text-lg leading-snug md:w-2/3 md:text-2xl">
							Say goodbye to traditional recruiting and hello to flexible,
							bounty-based rewards.
						</div>
						<ArrowButton href="/opportunities">
							{status === 'authenticated'
								? 'Current Opportunities'
								: 'Start Recruiting Now'}
						</ArrowButton>
					</div>
					<div className="h-full relative">
						<Floaters />
						{latestOpportunities.length ? (
							latestOpportunities.map((opportunity: IOpportunity, index) => (
								<OpportunityCard
									key={opportunity.id}
									opportunity={opportunity}
									className={index !== 1 ? 'scale-75' : 'scale-[0.85]'}
								/>
							))
						) : (
							<Loader />
						)}
					</div>
				</div>
			</section>

			<section
				id="details"
				className="mx-4 py-12 text-b-blue-dark"
			>
				<div className="mx-auto my-12 py-8 bg-b-lavender w-full max-w-7xl  rounded-lg shadow">
					<div className="p-5 mx-auto max-w-4xl text-center">
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
								It&apos;s time to empower recruiters.{' '}
								<span className="font-bold">βountree</span> let&apos;s you
								unlock your full potential with clarity at every step. Startups
								share their needs transparently with recruiters, who can
								communicate directly with hiring managers.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-4 pt-12 pb-28 mb- flex flex-col items-center justify-center text-center">
				<h1 className="text-5xl font-bold text-white">
					Get paid for knowing the right people
				</h1>
				<p className="text-white my-6 text-xl max-w-xl">
					Find great talent and get paid for it - it&apos;s a win-win with our
					bounty recruitment program.
				</p>

				<ArrowButton href="/opportunities">
					{status === 'authenticated'
						? 'Current Opportunities'
						: 'Start Recruiting Now'}
				</ArrowButton>
			</section>
		</Layout>
	)
}
