import Layout from "@/components/Layout"
import ArrowButton from "@/components/Misc/ArrowButton"
import Image from "next/image"
import JobDescriptionGenerator from "@/components/JobDescriptionGenerator"

export default function ProductPage() {
	return (
		<Layout classNames="bg-b-blue-dark text-b-blue-dark">
			<section className="flex flex-col justify-center items-center bg-b-blue-dark text-white">
				<div className="py-28 flex flex-col gap-2 p-4 lg:flex-row w-full max-w-7xl">
					<div className="w-full text-center lg:text-left max-w-7xl flex flex-col items-center lg:items-start gap-8">
						<h1 className="text-5xl max-w-sm font-bold">
							There's a better way to hire
						</h1>
						<p className="text-xl max-w-lg">
							Skip the headache of recruitment and let the{" "}
							<span className="font-bold text-b-yellow">βountree</span> referral
							network find your dream team.
						</p>
						<ArrowButton target="_blank" href="https://calendly.com/wdib">
							Book a Demo
						</ArrowButton>
						<p className="text-2xl font-bold lg:mb-0 mb-8 ">
							Or try out our magic{" "}
							<span className="text-b-yellow">job description generator</span>!
							<span className="hidden lg:inline">👉</span>
							<span className="lg:hidden inline">👇</span>
						</p>
					</div>
					<div className="w-full">
						<JobDescriptionGenerator />
						<p className="mt-2 text-justify">
							Hire top talent without spending all your time crafting the
							perfect job description with βountree's Job Description Generator!
							Create tailored and professional job postings that reflect your
							company's unique voice.
						</p>
					</div>
				</div>

				<small className="mb-5">Trusted by</small>
				<div className="grid grid-cols-5 max-w-5xl gap-4 mb-20 mx-4">
					<Image
						src="/static/product/coinmena.png"
						alt="company logo"
						width={200}
						height={200}
						className="bg-white rounded-full p-3 h-full w-full mx-auto object-contain max-h-16"
					></Image>
					<Image
						src="/static/product/clara.png"
						alt="company logo"
						width={200}
						height={200}
						className="bg-white rounded-full p-3 h-full w-full mx-auto object-contain max-h-16"
					></Image>
					<Image
						src="/static/product/syarah.png"
						alt="company logo"
						width={200}
						height={200}
						className="bg-white rounded-full p-3 h-full w-full mx-auto object-contain max-h-16"
					></Image>
					<Image
						src="/static/product/zest.png"
						alt="company logo"
						width={200}
						height={200}
						className="bg-white rounded-full p-3 h-full w-full mx-auto object-contain max-h-16"
					></Image>
					<Image
						src="/static/product/pluto.png"
						alt="company logo"
						width={200}
						height={200}
						className="bg-white rounded-full p-3 h-full w-full mx-auto object-contain max-h-16"
					></Image>
				</div>
			</section>
		</Layout>
	)
}
