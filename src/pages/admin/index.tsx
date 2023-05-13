import Layout from "@/components/Layout/Layout"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useState, useEffect, useCallback } from "react"
import IApplication from "@/types/application"
import { useRouter } from "next/router"
import Link from "next/link"
import { Loader } from "@/components/Loader/Loader"
import ApplicantCard from "@/components/Dashboard/ApplicantCard"
import GenericModal from "@/components/Modals/GenericModal"
import { classNames, statusStyle } from "@/utils/misc"
import Unauthorized from "@/components/Admin/Unauthorized"

export default function Admin() {
	const { data: session, status } = useSession()
	const [applications, setApplications] = useState<IApplication[]>([])
	const [archived, setArchived] = useState<IApplication[]>([])
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
			const applications = data.applications.filter(
				(app: IApplication) => app.status !== "rejected"
			)
			const archived = data.applications.filter(
				(app: IApplication) => app.status === "rejected"
			)
			setApplications(applications)
			setArchived(archived)
		}

		if (session && isAdmin) getDashboardData()
	}, [session, isAdmin])

	if (status === "unauthenticated") {
		signIn("", { callbackUrl: router.asPath })
	}

	const handleOnSelectApplication = useCallback((application: IApplication) => {
		setModalOpen(() => {
			setSelectedApplication(application)
			return true
		})
	}, [])

	if (session && !isAdmin) return <Unauthorized session={session} />

	if (!applications || applications.length === 0) return <Loader />

	return (
		<Layout classNames="bg-b-blue-dark">
			<div className="overflow-x-auto w-full max-w-7xl mx-auto  p-4">
				<h1 className="text-2xl font-bold my-5 text-white">Applications</h1>
				<Link
					href="#archived"
					className="badge badge-warning badge-outline mb-5"
				>
					👇 Jump to Archived 👇
				</Link>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th></th>
							<th>Date</th>
							<th>Candidate</th>
							<th>Recruiter</th>
							<th>Position</th>
							<th>Company</th>
							<th>Update status</th>
						</tr>
					</thead>
					<tbody>
						{applications.length &&
							applications.map((app, idx) => {
								return (
									<Row
										setApplications={setApplications}
										handleOnSelectApplication={handleOnSelectApplication}
										key={app.id}
										application={app}
										num={idx + 1}
									/>
								)
							})}
					</tbody>
				</table>

				<div
					tabIndex={0}
					className="collapse collapse-arrow border mt-12 rounded-lg bg-red-900 "
				>
					<h1
						id="archived"
						className="text-2xl font-bold my-5 text-white collapse-title"
					>
						Archived (rejections)
					</h1>

					<div className="collapse-content">
						<table className=" table table-zebra w-full">
							<thead>
								<tr>
									<th></th>
									<th>Date</th>
									<th>Candidate</th>
									<th>Recruiter</th>
									<th>Position</th>
									<th>Company</th>
									<th>Update status</th>
								</tr>
							</thead>
							<tbody>
								{archived.length &&
									archived.map((app, idx) => {
										return (
											<Row
												setApplications={setArchived}
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
				</div>
			</div>
			{modalOpen && selectedApplication !== null && (
				<GenericModal
					className="max-w-3xl text-left"
					setModalOpen={setModalOpen}
				>
					<ApplicantCard open={true} {...selectedApplication} />
				</GenericModal>
			)}
		</Layout>
	)
}

function Row({
	application,
	num,
	handleOnSelectApplication,
	setApplications,
}: {
	application: IApplication
	num: number
	handleOnSelectApplication: (application: IApplication) => void
	setApplications: React.Dispatch<React.SetStateAction<IApplication[]>>
}) {
	const [selectedStatus, setSelectedStatus] = useState(application.status)
	const [reason, setReason] = useState("")

	async function handleUpdateStatus(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()
		const res = await fetch(`/api/admin/applications/${application._id}`, {
			method: "PUT",
			body: JSON.stringify({
				status: selectedStatus,
				userName: application.user?.name,
				userEmail: application.user?.email,
				candidateName: application.name,
				positionName: application.opportunity?.title,
				startupName: application.opportunity?.company.name,
				...(selectedStatus === "rejected" ? { reason } : {}),
			}),
		})
		const data = await res.json()
		console.log(data)

		setApplications((prev) => {
			const idx = prev.findIndex((app) => app._id === application._id)
			prev[idx].status = selectedStatus
			return [...prev]
		})
	}

	return (
		<tr
			className="hover cursor-pointer"
			onClick={() => handleOnSelectApplication(application)}
		>
			<th>{num}</th>
			<td>
				{new Date(application.createdAt).toLocaleString("en-US", {
					dateStyle: "short",
					timeStyle: "short",
				})}
			</td>
			<td>{application.name}</td>
			<td>{application.user?.name}</td>
			<td>
				{selectedStatus === "rejected" &&
				selectedStatus !== application.status ? (
					<input
						className="input input-error"
						type="text"
						placeholder="Reason for rejection"
						value={reason}
						onClick={(e) => e.stopPropagation()}
						onChange={(e) => setReason(e.target.value)}
					/>
				) : (
					application.opportunity?.title
				)}
				{}
			</td>
			<td>
				{selectedStatus !== application.status ? (
					<button
						onClick={handleUpdateStatus}
						className="btn btn-sm bg-b-yellow text-black mx-auto"
					>
						update
					</button>
				) : (
					application.opportunity?.company.name
				)}
			</td>
			<td onClick={(e) => e.stopPropagation()}>
				<select
					className="select select-bordered"
					onChange={(e) => setSelectedStatus(e.target.value as any)}
					name="status"
				>
					{Object.keys(statusStyle).map((status) => (
						<option
							value={status}
							selected={application.status === status}
							key={status}
						>
							{status}
						</option>
					))}
				</select>
				<div
					className={classNames(
						"w-2 h-2 rounded-full inline-block ml-2 my-1",
						statusStyle[application.status]
					)}
				></div>
			</td>
		</tr>
	)
}
