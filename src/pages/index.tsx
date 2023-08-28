import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/Layout/Layout"
import { useSession } from "next-auth/react"
import ArrowSVG from "@/components/Misc/ArrowSVG"
import OpportunityCard from "@/components/Opportunities/OpportunityCard"
import { Loader } from "@/components/Loader/Loader"
import IOpportunity from "@/types/opportunity"
import Floaters from "@/components/Misc/Floaters"
import HoverButton from "@/components/Misc/HoverButton"
import HowItWorksCard from "@/components/Misc/HowItWorksCard"
import { getLatestOpportunities } from "@/controllers/opportunity"
import { InferGetServerSidePropsType, GetServerSideProps } from "next"
import {
  ArrowUturnUpIcon,
  LockOpenIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline"

export default function Home({
  latestOpportunities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { status } = useSession()

  return (
    <Layout classNames="bg-white">
      <section className=" mt-12 flex flex-col items-center justify-center overflow-hidden md:overflow-visible ">
        <div className="mt-20 grid w-full max-w-7xl px-4 py-12 lg:grid-cols-2 ">
          <div className=" z-10 flex flex-col items-center justify-center lg:items-start">
            <Link href="/product">
              <div className="mb-3 flex  w-fit rounded-full bg-gray-100 px-4 py-0.5 text-xs transition-colors duration-500 hover:bg-purple-200 sm:text-base">
                <div>
                  Are you a startup? Hire with{" "}
                  <span className="font-bold">bountree!</span>
                </div>
                <ArrowSVG className="fill-purple-500" />
              </div>
            </Link>
            <h1 className="text-center text-5xl font-bold md:text-5xl lg:text-left">
              Get paid to refer <br /> top talent.
            </h1>
            <div className=" mt-6 w-full text-center text-lg leading-snug md:w-2/3 lg:text-left">
              Why refer candidates to startups for free when you can earn
              rewards with <span className="font-bold">bountree?</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <HoverButton
                type="secondary"
                href="/opportunities"
                className="mt-6"
              >
                {status === "authenticated"
                  ? "Current opportunities"
                  : "Start referring now"}
              </HoverButton>

              <HoverButton href="/product" className="mt-6" type="outline">
                Learn more
              </HoverButton>
            </div>
          </div>
          <div className="relative mt-10 h-full overflow-visible">
            <Floaters />
            {latestOpportunities.length ? (
              latestOpportunities.map(
                (opportunity: IOpportunity, index: number) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    className={
                      index !== 1
                        ? "scale-75 shadow-none"
                        : "scale-[0.85] shadow-none"
                    }
                  />
                )
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="z-10 w-full max-w-7xl p-4">
          <p className="text-center md:text-left">
            Help the most disruptive startups find talent
          </p>
          <div className="mt-4 grid max-w-5xl grid-cols-2 gap-4 gap-y-8 md:grid-cols-8">
            <Image
              src="/static/product/coinmena.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/pluto.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/krews.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/clara.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/stake-logo 1.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/zest.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/khwarizmi.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
            <Image
              src="/static/product/syarah.png"
              alt="company logo"
              width={150}
              height={150}
              className="h-full max-h-6 w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section id="latest-jobs" className="mx-4 py-12 "></section>

      <section
        className="bg-neutral-50 px-4 py-16"
        id="how-it-works"
        style={{
          backgroundImage:
            "radial-gradient(#cecece 0.5px, rgb(250,250,250) 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        <h1 className="text-center text-3xl font-thin md:text-5xl">
          Turn connections into
          <br />
          <span
            className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text font-semibold
						text-transparent underline decoration-transparent underline-offset-8
					"
          >
            collections.
          </span>
        </h1>

        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
          <HowItWorksCard
            step={1}
            pill="Connect"
            description="Join the hunt for the perfect match and turn connections into valuable opportunities."
          />
          <HowItWorksCard
            step={2}
            pill="Interview"
            description="Stay organized and in control with real-time tracking of candidate interviews, ensuring efficient and effective hiring."
          />
          <HowItWorksCard
            step={3}
            pill="Collect"
            description="Skyrocket your earning potential with Bountree's unlimited possibilities for referrer rewards and bounties."
          />
        </div>
      </section>

      {/* <section
				id="details"
				className="mx-4 py-12 "
			>
				<div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto relative">
					<div>
						<div className="min-h-[50vh] flex flex-col justify-center items-center lg:items-start">
							<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5 bg-gradient-to-r from-orange-300 to-pink-300 text-orange-900 font-semibold">
								<div>The deets</div>
							</div>
							<h1 className="text-5xl font-bold mb-4">How it works</h1>
							<p className="text-lg text-center lg:text-left">
								<span className="font-bold">bountree</span> connects top talent
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
								<span className="font-bold">bountree</span> connects top talent
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
								<span className="font-bold">bountree</span> connects top talent
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
							className="rounded-md shadow-md shadow-gray-500 "
						/>
					</div>
				</div>
				<div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
					<Image
						src="/static/opportunity-detail.jpg"
						height={460}
						width={937}
						alt="Opportunity Detail"
						className="rounded-md shadow-md shadow-gray-500"
					/>
					<div className="flex flex-col justify-center items-center lg:items-start py-28">
						<div className="text-xs sm:text-base  mb-3 flex w-fit rounded-full px-4 py-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 text-yellow-900 font-semibold ">
							<div>More stuff</div>
						</div>
						<h1 className="text-3xl md:text-5xl font-bold mb-4">Part two</h1>
						<p className="text-lg text-center lg:text-left">
							<span className="font-bold">bountree</span> connects top talent
							with innovative startups looking to hire. As a recruiter on our
							platform, you can earn rewards by referring candidates to
							opportunities.
						</p>
					</div>
				</div>
			</section> */}

      <section className="mx-4">
        <div className="mx-auto my-12 w-full max-w-7xl py-8">
          <div className="mx-auto max-w-4xl p-5 text-center">
            <div className="mx-auto mb-3 flex w-fit rounded-full bg-purple-100 px-4 py-0.5 text-xs font-semibold text-purple-500 sm:text-base">
              Refer a friend and earn
            </div>
            <h1
              data-tip="facts"
              className="tooltip mb-2 text-center  text-4xl font-bold md:text-5xl"
            >
              Your network is your net worth.
            </h1>
            <h1 className="mb-8 text-4xl font-bold md:text-5xl">
              Earn bounties by tapping into it.
            </h1>
            <p className="mb-10 text-justify text-lg">
              <span className="font-bold">bountree</span> connects top talent
              with innovative startups looking to hire. As a recruiter on our
              platform, you have the freedom to work when you want and earn as
              much as you want. The sky&apos;s the limit.
            </p>
            <Image
              src="/static/opportunity-detail.png"
              height={460}
              width={937}
              alt="Opportunity Detail"
              className="rounded-md shadow"
            />
          </div>
        </div>
        <div className="mx-auto my-12 grid w-full max-w-7xl gap-4 rounded-md  border border-purple-400 bg-purple-50 px-5 py-12 shadow md:grid-cols-2">
          <div className=" flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2">
              <UserPlusIcon className="inline h-10 w-10 text-purple-900" />
              <h3 className="text-3xl font-bold text-purple-900">
                Recruit like a pro.
              </h3>
            </div>
            <h4 className="max-w-sm text-2xl font-semibold ">
              We&apos;ve built the tools and resources you need to excel as a
              recruiter and find the perfect matches.
            </h4>
            <p className="mb-13 text-xl text-purple-900">
              bountree&apos;s recruiter tools help you succeed at every stage of
              the interview process.
            </p>
          </div>
          <Image
            className="m-auto h-auto w-full rounded-md shadow-md md:inline"
            src="/static/dashboard.png"
            width={538}
            height={307}
            alt="leads"
          />
        </div>
        <div className="mx-auto my-12 w-full max-w-7xl rounded-md">
          <div className="grid grid-cols-2 gap-12">
            <div className="col-span-2 rounded-md border border-pink-300 bg-pink-100 px-6 py-6 shadow md:col-span-1">
              <div className="mb-5 flex items-center  gap-2">
                <ArrowUturnUpIcon className="inline h-10 w-10 text-pink-900" />
                <h3 className="text-3xl font-bold text-pink-900">
                  Less is more.
                </h3>
              </div>
              <p className="text-lg">
                Our platform prioritizes simplicity to enhance the user
                experience. Join bountree and start earning in your first week
                by working on your own terms, with startups that interest you
                and make the most of your time.
              </p>
            </div>
            <div className="col-span-2 rounded-md border border-yellow-400 bg-yellow-50 px-6  py-6 shadow md:col-span-1">
              <div className="mb-5 flex items-center gap-2">
                <LockOpenIcon className="inline h-10 w-10 text-yellow-900" />
                <h3 className="text-3xl font-bold text-yellow-900">
                  No secrets here.
                </h3>
              </div>
              <p className="text-lg">
                It&apos;s time to empower recruiters.{" "}
                <span className="font-bold">bountree</span> let&apos;s you
                unlock your full potential with clarity at every step. Startups
                share their needs transparently with recruiters, who can
                communicate directly with hiring managers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mb-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center rounded-md border border-green-400 bg-green-100 px-10 py-20 text-center shadow">
          <h1 className="text-4xl font-bold md:text-5xl ">
            Get <span className="">paid</span> for knowing the{" "}
            <span className="underline decoration-green-400 ">right</span>{" "}
            people
          </h1>
          <p className=" my-6 max-w-xl text-xl">
            Find great talent and get paid for it - it&apos;s a win-win with our
            bounty recruitment program.
          </p>
          <HoverButton href="/opportunities" type="green">
            {status === "authenticated"
              ? "Current Opportunities"
              : "Start Recruiting Now"}
          </HoverButton>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const latestOpportunities = await getLatestOpportunities()
  return {
    props: {
      latestOpportunities: JSON.parse(JSON.stringify(latestOpportunities)),
    },
  }
}
