import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import MobileMenu from "./MobileMenu"
import NavRight from "./NavRight"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { classNames } from "@/utils"

export default function Navbar() {
	const { data: session } = useSession()
	const router = useRouter()

	console.log(session)

	const isCurrent = (href: string) => {
		return router.pathname === href
	}

	const navigation = session
		? [
				{
					name: "Open roles",
					href: "/opportunities",
					current: isCurrent("/opportunities"),
				},
				{
					name: "Dashboard",
					href: "#",
					current: isCurrent("/dashboard"),
				},
		  ]
		: [
				{ name: "Post a Role", href: "#", current: isCurrent("#") },
				{ name: "Recruit", href: "#", current: isCurrent("#") },
				{ name: "Blog", href: "#", current: isCurrent("#") },
		  ]
	return (
		<Disclosure
			as="nav"
			className="bg-b-blue-dark sticky top-0 z-10 border-b-white border-b"
		>
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl text-white px-4">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<Link href="/" className="flex flex-shrink-0 items-center">
									<Image
										src="/favicon/android-chrome-192x192.png"
										alt="Mobile Logo"
										className="block h-8 w-auto lg:hidden"
										width={192}
										height={192}
									/>
									<Image
										src="/static/svg/logo.svg"
										alt="Logo"
										className="hidden h-8 w-auto lg:block"
										width={116}
										height={27}
									/>
								</Link>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-black/40 text-white"
														: "text-gray-300 hover:bg-white/10 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<NavRight />
						</div>
					</div>

					<MobileMenu navigation={navigation} />
				</>
			)}
		</Disclosure>
	)
}
