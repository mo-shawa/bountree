import Layout from "@/components/Layout"
import ArrowButton from "@/components/Misc/ArrowButton"
import Image from "next/image"

export default function ProductPage() {
	return (
		<Layout classNames="bg-b-blue-dark text-b-blue-dark">
			<section
				id="hero"
				className=" flex flex-col justify-center items-center bg-b-blue-dark text-white"
			>
				<div className="py-28 w-full text-center max-w-7xl px-4 flex flex-col items-center gap-8">
					<h1 className=" text-5xl max-w-sm mx-auto font-bold">
						There's a better way to hire
					</h1>
					<p className="text-xl max-w-lg">
						Skip the headache of recruitment and let the{" "}
						<span className="font-bold">βountree</span> referral network find
						your dream team{" "}
					</p>

					<ArrowButton target="_blank" href="https://calendly.com/wdib">
						Book a Demo
					</ArrowButton>

					<small>Trusted by</small>
					<div className="grid grid-cols-4 max-w-4xl gap-4">
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
					</div>
				</div>
			</section>
		</Layout>
	)
}
