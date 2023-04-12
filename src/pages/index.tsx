import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/Layout"

export default function Home() {
	return (
		<Layout>
			<section
				id="hero"
				className=" flex flex-col justify-center items-center bg-b-blue-dark text-white"
			>
				<div className="grid md:grid-cols-2 py-12 w-full max-w-7xl px-4">
					<div className=" flex flex-col items-center md:items-start justify-start ">
						<div className="bg-white text-black  mb-3 flex w-fit rounded-full border border-neutral-500 px-4 py-0.5">
							<div className="text-base">Looking for talent?</div>
							<Link href="/opportunities">
								<div className="group ml-2 flex cursor-pointer">
									<div className="text-base text-blue-500 group-hover:text-blue group-hover:underline">
										Explore
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										className="ml-1.5 w-2.5 fill-blue-500 group-hover:fill-blue"
									>
										<path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path>
									</svg>
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
						<Link href="/signup">
							<div className=" mt-6 flex w-fit cursor-pointer rounded-lg bg-b-yellow px-4 py-1.5 text-base hover:bg-b-yellow">
								<div className="my-auto mr-2 text-lg text-black">
									Start recruiting now
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									className="w-3"
								>
									<path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path>
								</svg>
							</div>
						</Link>
					</div>
					<Image
						src="https://via.placeholder.com/584x456?text=Hero+Image"
						height={456}
						width={584}
						className="max-w-50 h-auto hidden md:inline"
						alt="hero image"
					/>
				</div>
			</section>

			<section id="details" className="mx-4 py-12 text-b-blue-dark">
				<div className="mx-auto my-12 py-12 bg-b-blue w-full max-w-7xl  rounded-lg">
					<div className="p-5 mx-auto max-w-4xl text-center">
						<h1 className="md:text-5xl text-4xl  text-center font-bold mb-5">
							Your network is your net worth... <br /> earn bounties by tapping
							into it.
						</h1>
						<p className="mb-5 text-lg text-justify">
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
							className="rounded-lg shadow-xl"
						/>
					</div>
				</div>
				<div className="px-5 mx-auto my-12 py-12 bg-gray-200 w-full max-w-7xl  rounded-lg grid md:grid-cols-2 gap-4">
					<div className=" text-black flex flex-col justify-center">
						<h4 className="font-semibold max-w-sm text-2xl ">
							We&apos;ve built the tools and resources you need to excel as a
							recruiter and find the perfect matches.
						</h4>
						<h3 className="text-3xl font-bold my-5">Recruit like a pro</h3>
						<p className="text-xl text-gray-500 mb-13">
							βountree&apos;s recruiter tools help you succeed at every stage of
							the interview process.
						</p>
					</div>
					<Image
						className=" md:inline"
						src="https://via.placeholder.com/538x307?text=leads"
						width={538}
						height={307}
						alt="leads"
					/>
				</div>
				<div className="mx-auto my-12 w-full max-w-7xl  rounded-lg">
					<div className="grid grid-cols-5 gap-12 md:gap-4">
						<div className="col-span-5 md:col-span-3 bg-b-blue  py-6 px-6 rounded-lg">
							<h3 className="text-3xl font-bold mb-5">Less is more.</h3>
							<p className="text-lg">
								Our platform prioritizes simplicity to enhance the user
								experience. Join βountree and start earning in your first week
								by working on your own terms, with startups that interest you
								and make the most of your time.
							</p>
						</div>
						<div className="col-span-5 md:col-span-2 bg-b-blue-dark text-white py-6 px-6 rounded-lg">
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
				</div>
			</section>

			<section className="mx-4 pt-12 pb-28 mb- flex flex-col items-center justify-center text-center">
				<h1 className="text-5xl font-bold">
					Get paid for knowing the right people
				</h1>
				<p className="text-gray-600 my-6 text-xl max-w-xl">
					Find great talent and get paid for it - it&apos;s a win-win with our
					bounty recruitment program.
				</p>

				<Link href="/signup">
					<div className=" mt-6 flex w-fit cursor-pointer rounded-lg bg-b-yellow px-4 py-1.5 text-base hover:bg-b-yellow">
						<div className="my-auto mr-2 text-lg text-black">
							Start recruiting now
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							className="w-3"
						>
							<path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path>
						</svg>
					</div>
				</Link>
			</section>
		</Layout>
	)
}
