import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="w-full bg-gray-100 relative">
			<div className="mx-auto px-4 max-w-7xl flex gap-4 py-4 justify-between items-center">
				<div className="flex flex-col sm:flex-row gap-8">
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

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col sm:flex-row gap-2">
					<Link
						className="text-gray-400 text-xs"
						href="/cookie-policy"
					>
						Cookie Policy
					</Link>

					<Link
						className="text-gray-400 text-xs"
						href="/privacy-policy"
					>
						Privacy Policy
					</Link>
					<Link
						className="text-gray-400 text-xs"
						href="/recruiter-contract"
					>
						Recruiter Agreement
					</Link>
				</div>

				<small className="text-gray-400 flex gap-2 flex-col sm:flex-row">
					<span>2023 βountree</span> <span>© All Right Reserved</span>
				</small>
			</div>
		</footer>
	)
}
