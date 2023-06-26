import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="w-full  relative border-t bg-gray-50">
			<div className="mx-auto px-4 max-w-7xl flex w-full flex-col md:flex-row md:flex-nowrap flex-wrap gap-4 py-4 justify-between items-center">
				<div className="flex flex-row gap-8">
					<Image
						src="/static/svg/linkedin.svg"
						height={20}
						width={20}
						alt="linkedin"
					/>
					<Image
						src="/static/svg/twitter.svg"
						height={16}
						width={20}
						alt="linkedin"
						className="mt-1"
					/>
				</div>

				<div className="text-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-row gap-2">
					<Link
						className=" text-xs"
						href="/cookie-policy"
					>
						Cookie Policy
					</Link>

					<Link
						className=" text-xs"
						href="/privacy-policy"
					>
						Privacy Policy
					</Link>
					<Link
						className=" text-xs"
						href="/recruiter-contract"
					>
						Recruiter Agreement
					</Link>
				</div>

				<small className=" flex gap-2 flex-row">
					<span>2023 βountree</span> <span>© All Right Reserved</span>
				</small>
			</div>
		</footer>
	)
}
