import Layout from "@/components/Layout"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { Loader } from "@/components/Loader/Loader"

export default function Dashboard() {
	const { data: session, status } = useSession()

	const [applicants, setApplicants] = useState([])

	useEffect(() => {
		async function getDashboardData() {
			const res = await fetch(`/api/users/${session?.user.id}/dashboard`)
			const data = await res.json()

			setApplicants(data.opportunities)
		}

		if (session) getDashboardData()
	}, [session])

	if (status === "unauthenticated" || session === null) {
		signIn("", { callbackUrl: window.location.href })
	}

	return (
		<Layout>
			<div className="mx-auto w-full max-w-7xl h-100 py-10 grid grid-cols-3 gap-28">
				<SideBar session={session} />
				<Content applicants={applicants} session={session} />
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
						<p className="text-2xl font-bold">5</p>
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
				<div className="flex gap-2 flex-col mt-4 w-full">
					<a href="#" className="text-gray-500 hover:text-gray-700">
						Profile
					</a>
					<a href="#" className="text-gray-500 hover:text-gray-700">
						Settings
					</a>
					<a href="#" className="text-gray-500 hover:text-gray-700">
						Sign out
					</a>
				</div>
			</div>
		</div>
	)
}

function Content({ session, applicants }: Props) {
	return (
		<div className="bg-gray-100 rounded mx-auto w-full overflow-clip max-w-7xl h-100  grid col-span-2">
			<div className="flex flex-col justify-center">
				<h1 className="text-4xl font-bold mt-4">Your Referrals</h1>
				<div className="flex flex-col gap-3 mt-4 w-full bg-gray-200 h-full">
					{<Loader /> &&
						applicants?.length &&
						applicants.map(() => <ApplicantCard />)}
				</div>
			</div>
		</div>
	)
}

type Props = {
	session: Session | null
	applicants?: any[]
}

function ApplicantCard({
	date,
	name,
	email,
	cv,
	opportunityID,
}: ApplicantCardProps) {
	return (
		<div className="w-full h-20 bg-white shadow-md rounded-md flex flex-row items-center justify-between px-4">
			yo
		</div>
	)
}

type ApplicantCardProps = {
	date?: string
	name?: string
	email?: string
	cv?: string
	opportunityID?: string
}
