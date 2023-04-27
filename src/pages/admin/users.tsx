import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import IApplication from "@/types/Application"
import { useRouter } from "next/router"
import Link from "next/link"
import { Loader } from "@/components/Loader/Loader"
import IUser from "@/types/User"

export default function Admin() {
	const { data: session, status } = useSession()
	const [users, setUsers] = useState<IUser[]>([])

	const router = useRouter()

	const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false

	useEffect(() => {
		async function getDashboardData() {
			const res = await fetch(`/api/admin/users`)
			const data = await res.json()
			console.log(data)
			setUsers(data.users)
		}

		if (session && isAdmin) getDashboardData()
	}, [session, isAdmin])

	if (status === "unauthenticated") {
		signIn("", { callbackUrl: router.asPath })
	}

	if (session && !isAdmin) {
		return (
			<Layout classNames="flex items-center justify-center bg-b-blue-dark p-4">
				<div className="p-5 rounded text-red-500 text-center ">
					<h1 className="text-2xl text- font-bold">
						You ({session?.user.email}) are not authorized to view this page.
					</h1>
					<h1 className="text-xl ">
						Only @bountree.app emails are authorized.
					</h1>
					<Link className="underline text-white" href="/">
						Click here before we have a problem.
					</Link>
				</div>
			</Layout>
		)
	}

	if (!users || users.length === 0) {
		return <Loader />
	}

	return (
		<Layout classNames="bg-b-blue-dark">
			<div className="overflow-x-auto w-full max-w-7xl mx-auto  p-4">
				<h1 className="text-2xl font-bold my-5 text-white">Users</h1>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th></th>
							<th>Date Created</th>
							<th>Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{users.length &&
							users.map((user, idx) => {
								return <Row key={user.id} user={user} num={idx + 1} />
							})}
					</tbody>
				</table>
			</div>
		</Layout>
	)
}

function Row({ user, num }: { user: IUser; num: number }) {
	return (
		<tr className="hover">
			<th>{num}</th>
			<td>{new Date(user.createdAt).toDateString()}</td>
			<td>{user.name}</td>
			<td>{user.email}</td>
		</tr>
	)
}
