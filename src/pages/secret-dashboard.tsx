import Layout from "@/components/Layout"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"

export default function Dashboard() {
	const { data: session } = useSession()

	return (
		<Layout>
			<div className="mx-auto w-full max-w-7xl h-100 py-10 grid grid-cols-3 gap-28">
				<SideBar session={session} />
				<Content session={session} />
			</div>
		</Layout>
	)
}

function SideBar({ session }: Props) {
	return (
		<div className="bg-white rounded mx-auto w-full max-w-7xl h-100 py-10 grid col-span-1 p-6 shadow">
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
						<p className="text-2xl font-bold">4.5</p>
						<p className="text-2xl text-gray-500">/5</p>
					</div>
				</div>
				<div className="w-full mt-5">
					<p className="text-gray-500 text-xl">Potential rewards</p>
					<div className="flex items-center">
						<p className="text-2xl font-bold">
							{session?.user.potentialEarnings.toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
						</p>
					</div>
				</div>
				<div className="w-full mt-5">
					<p className="text-gray-500 text-xl">Total Earnings</p>
					<div className="flex items-center">
						<p className="text-2xl font-bold">
							{session?.user.totalEarnings.toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
						</p>
					</div>
				</div>

				{/* <div className="flex flex-col mt-4 w-full">
					<a
						href="#"
						className="text-gray-500 hover:text-gray-700"
					>
						Profile
					</a>
					<a
						href="#"
						className="text-gray-500 hover:text-gray-700"
					>
						Settings
					</a>
					<a
						href="#"
						className="text-gray-500 hover:text-gray-700"
					>
						Sign out
					</a>
				</div> */}
			</div>
		</div>
	)
}

function Content({ session }: Props) {
	return (
		<div className="bg-gray-100 rounded mx-auto w-full max-w-7xl h-100 py-10 grid col-span-2">
			<div className="flex flex-col items-center">
				<h1 className="text-2xl font-bold mt-4">Content</h1>
			</div>
		</div>
	)
}

type Props = {
	session: Session | null
}
