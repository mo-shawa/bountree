import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import IApplication from "@/types/Application"
import { useRouter } from "next/router"
import Link from "next/link"
import { Loader } from "@/components/Loader/Loader"
import ApplicantCard from "@/components/Dashboard/ApplicantCard"
import GenericModal from "@/components/Modals/GenericModal"

export default function Admin() {
	const { data: session, status } = useSession()
	const [applications, setApplications] = useState<IApplication[]>([])
	const [selectedApplication, setSelectedApplication] =
		useState<IApplication | null>(null)
	const [modalOpen, setModalOpen] = useState(false)
	const router = useRouter()

	const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false

	useEffect(() => {
		async function getDashboardData() {
			const res = await fetch(`/api/admin/applications`)
			const data = await res.json()
			console.log(data)
			setApplications(data.applications)
		}

		if (session && isAdmin) getDashboardData()
	}, [session, isAdmin])

	if (status === "unauthenticated") {
		signIn("", { callbackUrl: router.asPath })
	}

	function handleOnSelectApplication(application: IApplication) {
		setModalOpen(() => {
			setSelectedApplication(application)
			return true
		})
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

	if (!applications || applications.length === 0) {
		return <Loader />
	}

	return (
		<Layout classNames="bg-b-blue-dark">
			<div className="overflow-x-auto w-full max-w-7xl mx-auto  p-4">
				<h1 className="text-2xl font-bold my-5 text-white">Applications</h1>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th></th>
							<th>Date</th>
							<th>Candidate</th>
							<th>Recruiter</th>
							<th>Position</th>
							<th>Company</th>
						</tr>
					</thead>
					<tbody>
						{applications.length &&
							applications.map((app, idx) => {
								return (
									<Row
										handleOnSelectApplication={handleOnSelectApplication}
										key={app.id}
										application={app}
										num={idx + 1}
									/>
								)
							})}
					</tbody>
				</table>
			</div>
			{modalOpen && selectedApplication !== null && (
				<GenericModal classes="max-w-3xl text-left" setModalOpen={setModalOpen}>
					<ApplicantCard open={true} {...selectedApplication} />
					{/* hello */}
				</GenericModal>
			)}
		</Layout>
	)
}

function Row({
	application,
	num,
	handleOnSelectApplication,
}: {
	application: IApplication
	num: number
	handleOnSelectApplication: (application: IApplication) => void
}) {
	return (
		<tr
			className="hover cursor-pointer"
			onClick={() => handleOnSelectApplication(application)}
		>
			<th>{num}</th>
			<td>{new Date(application.createdAt).toDateString()}</td>
			<td>{application.name}</td>
			<td>{application.user?.name}</td>
			<td>{application.opportunity?.title}</td>
			<td>{application.opportunity?.company.name}</td>
		</tr>
	)
}
