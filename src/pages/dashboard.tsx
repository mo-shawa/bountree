import Layout from "@/components/Layout/Layout"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { Application } from "@/types/application"
import { useRouter } from "next/router"
import Sidebar from "@/components/Dashboard/Sidebar"
import MainContent from "@/components/Dashboard/MainContent"

export default function Dashboard() {
  const { data: session, status } = useSession()

  const [applicants, setApplicants] = useState<Application[]>([])
  const router = useRouter()

  const getPotentialEarnings = (applicants: Application[]) => {
    const uniqueApplicants = applicants.filter(
      (app, index, self) =>
        index ===
          self.findIndex((t) => t.opportunityId === app.opportunity?._id) &&
        ["pending", "interviewing"].includes(app.status)
    )

    const potentialEarnings = uniqueApplicants.reduce((acc, curr) => {
      return acc + curr.opportunity?.reward.amount!
    }, 0)

    return potentialEarnings
  }

  getPotentialEarnings(applicants)

  const totalEarnings = applicants
    .filter((app) => app.status === "hired")
    .reduce((acc, curr) => {
      return acc + curr.opportunity?.reward.amount!
    }, 0)

  useEffect(() => {
    async function getDashboardData() {
      const res = await fetch(`/api/users/${session?.user.id}/dashboard`)
      const data = await res.json()
      setApplicants(data.opportunities)
    }

    if (session) getDashboardData()
  }, [session])

  if (status === "unauthenticated") {
    signIn("", { callbackUrl: router.asPath })
  }

  return (
    <Layout classNames="bg-gray-50 pt-28">
      <div className="h-100 mx-auto w-full max-w-7xl grid-cols-1 py-10 md:grid md:grid-cols-3 lg:gap-12 xl:gap-20 ">
        <Sidebar
          totalEarnings={totalEarnings}
          potentialEarnings={getPotentialEarnings(applicants)}
          session={session}
        />
        <MainContent applicants={applicants} />
      </div>
    </Layout>
  )
}
