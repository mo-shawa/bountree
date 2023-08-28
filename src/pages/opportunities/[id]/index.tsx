import { useRouter } from "next/router"
import Layout from "@/components/Layout/Layout"
import { useEffect, useState } from "react"
import IOpportunity from "../../../types/opportunity"
import { useSession } from "next-auth/react"
import Loader from "@/components/Loader/Loader"
import { signIn } from "next-auth/react"
import RecruitModal from "@/components/Modals/RecruitModal/RecruitModal"
import IApplication from "@/types/application"
import PrimarySection from "@/components/Opportunity/PrimarySection"
import ReferralCard from "@/components/Opportunity/ReferralCard"

export default function PostDetail() {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { data: session, status } = useSession()

  const [post, setPost] = useState<IOpportunity>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [applicationsRemaining, setApplicationsRemaining] = useState<number>(5)

  const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/opportunities/${id}`)
      const data = await res.json()

      if (!res.ok || data.success === false) {
        setError(
          "An error occurred while loading the post. Please try again in a few minutes."
        )
        return
      }

      setPost(data.opportunity)
    }

    if (router.isReady) fetchPost()
  }, [id, router.isReady, session?.user._id])

  useEffect(() => {
    if (!post) return

    setApplicationsRemaining(
      (session?.user.applicationLimit || 5) -
        post.applications.filter(
          (a: IApplication) => a.userId === session?.user._id
        ).length
    )
  }, [post, session?.user.applicationLimit, session?.user._id])

  if (status === "loading" || !post) return <Loader />

  if (status === "unauthenticated" || session === null) {
    signIn("", { callbackUrl: window.location.href })
  }

  if (error) {
    return (
      <Layout classNames="bg-b-blue-dark flex justify-center">
        <div className="absolute left-1/2 top-1/2 my-4 flex -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-between rounded bg-white p-4 py-10">
          <h1 className="mx-auto rounded-full text-xl">{error}</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout classNames="flex justify-center pt-24 bg-neutral-50">
      <section className="grid w-full max-w-7xl grid-cols-6 px-4 ">
        <PrimarySection
          post={post}
          applicationsRemaining={applicationsRemaining}
          setModalOpen={setModalOpen}
          isAdmin={isAdmin}
        />
        <ReferralCard
          post={post}
          applicationsRemaining={applicationsRemaining}
          setModalOpen={setModalOpen}
          isAdmin={isAdmin}
        />
        {modalOpen && (
          <RecruitModal
            requirements={post.requirements}
            opportunityId={id}
            userId={session?.user.id}
            setModalOpen={setModalOpen}
            setPost={setPost}
            applicationsRemaining={applicationsRemaining}
            setApplicationsRemaining={setApplicationsRemaining}
          />
        )}
      </section>
    </Layout>
  )
}
