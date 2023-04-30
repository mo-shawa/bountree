import IApplication from "@/types/Application"
import { Session } from "next-auth"
import Image from "next/image"
import { formatCurrency } from "@/utils/misc"
import { signOut } from "next-auth/react"

type SidebarProps = {
	totalEarnings: number
	potentialEarnings: number
	session: Session | null
	applicants?: IApplication[]
}

export default function SideBar({
	session,
	potentialEarnings,
	totalEarnings,
}: SidebarProps) {
	return (
		<div className="p-4">
			<div className="bg-white md:sticky top-20 rounded md:mx-auto w-full max-w-7xl h-min py-10 lg:grid col-span-1 p-6 shadow">
				<div className="flex flex-col items-center">
					<Image
						src={session?.user.image || "/static/png/user.png"}
						alt="User image"
						height={128}
						width={128}
						className="rounded-full"
					/>
					<h1 className="text-2xl font-bold mt-4">{session?.user.name}</h1>
					<p className="text-gray-500">{session?.user.email}</p>
					<hr className="w-full mt-5" />
					<div className="w-full mt-5">
						<p className="text-gray-500 text-xl">Rating</p>
						<div className="flex items-center">
							<p className="text-2xl font-bold">5</p>
							<p className="text-2xl text-gray-500">/5</p>
						</div>
					</div>
					<div className="w-full mt-5">
						<p className="text-gray-500 text-xl">Potential rewards</p>
						<div className="flex items-center">
							<p className="text-2xl font-bold">
								{formatCurrency(potentialEarnings, "USD")}
							</p>
						</div>
					</div>
					<div className="w-full mt-5">
						<p className="text-gray-500 text-xl">Total Earnings</p>
						<div className="flex items-center">
							<p className="text-2xl font-bold">
								{formatCurrency(totalEarnings, "USD")}
							</p>
						</div>
					</div>
					<hr className="w-full mt-5" />
					<div className="flex gap-2 flex-col mt-4 w-full">
						<a href="#" className="text-gray-500 hover:text-gray-700">
							Profile
						</a>
						<a href="#" className="text-gray-500 hover:text-gray-700">
							Settings
						</a>
						<a
							href="#"
							onClick={() => signOut({ callbackUrl: "/" })}
							className="text-gray-500 hover:text-gray-700"
						>
							Sign out
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
