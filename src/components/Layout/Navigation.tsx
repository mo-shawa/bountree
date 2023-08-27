import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { classNames } from "@/utils/misc"
import HoverButton from "../Misc/HoverButton"

export default function Navigation() {
	const { data: session, status } = useSession()
	const router = useRouter()

	const isCurrent = (href: string) => {
		return router.pathname === href
	}

	const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false
	console.log(session)
	const navigation = session
		? [
				{
					name: "Open roles",
					href: "/opportunities",
					current: isCurrent("/opportunities"),
				},
				{
					name: "Dashboard",
					href: "/dashboard",
					current: isCurrent("/dashboard"),
				},
				...(isAdmin
					? [{ name: "Admin", href: "/admin", current: isCurrent("/admin") }]
					: []),
		  ]
		: [
				// { name: "Referrers", href: "#", current: isCurrent("#") },
				{ name: "Product", href: "/product", current: isCurrent("/product") },
				{ name: "Open Roles", href: "/opportunities", current: isCurrent("/opportunities") },
				// { name: "Blog", href: "#", current: isCurrent("#") },
				// { name: "FAQ", href: "#", current: isCurrent("#") },
		  ]
	return (
		<nav>
			<div
				className="navbar fixed top-2 left-1/2 
      transform -translate-x-1/2 z-50 rounded-2xl shadow-lg
      filter backdrop-blur-xl w-[80rem] max-w-[calc(100vw-3rem)] bg-white/50"
			>
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							{navigation.map((item) => (
								<li
									className={classNames(
										item.current ? "bg-base-200" : "",
										"cursor-pointer hover:bg-base-200"
									)}
									key={item.name}
								>
									{item.name}
								</li>
							))}
						</ul>
					</div>
					<Link href="/" className="cursor-pointer mx-4 text-xl">
						<Image
							src="/static/svg/bountree.svg"
							alt="Logo"
							width={120}
							height={30}
						/>
					</Link>
					<div className=" hidden lg:flex">
						<ul className="menu menu-horizontal px-1 gap-4">
							{navigation.map((item) => (
								<li key={item.name}>
									<Link
										className={classNames(
											"cursor-pointer rounded-full transition-colors hover:bg-pink-50",
											item.current
												? "bg-gradient-to-r from-pink-200 to-purple-200"
												: ""
										)}
										href={item.href}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="navbar-end gap-2">
					{status === "authenticated" ? (
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<Image
										src={session?.user.image || "/static/png/user.png"}
										alt="Avatar"
										width={40}
										height={40}
									/>
								</div>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<Link href="/dashboard" className="justify-between">
										Dashboard
									</Link>
								</li>

								<li onClick={() => signOut({ callbackUrl: "/" })}>
									<a href="#">Sign out</a>
								</li>
							</ul>
						</div>
					) : (
						<>
							{/* <HoverButton
								type="outline"
								className="hidden lg:flex"
								onClick={signIn}
								target="_self"
							>
								Sign in
							</HoverButton> */}
							<HoverButton
								type="secondary"
								// className="hidden lg:flex"
								onClick={signIn}
								target="_self"
							>
								Sign in
							</HoverButton>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}
