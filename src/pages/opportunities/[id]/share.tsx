import Top from "@/components/Opportunity/Top"
import SecondarySection from "@/components/Opportunity/SecondarySection"
import CompanySection from "@/components/Opportunity/CompanySection"
import { Opportunity } from "@/types/opportunity"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Loader } from "@/components/Loader/Loader"
import BlankLayout from "@/components/Layout/BlankLayout"

export default function SharedOpportunity() {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const [post, setPost] = useState<Opportunity>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/opportunities/${id}/share`)
      const data = await res.json()

      if (data.error) {
        setError(
          "An error occurred while loading the post. Please try again in a few minutes."
        )
        return
      }

      setPost(data.opportunity)
    }

    if (router.isReady) fetchPost()
  }, [id, router.isReady])

  if (error) {
    return (
      <BlankLayout classNames="bg-b-blue-dark flex justify-center">
        <div className="absolute left-1/2 top-1/2 my-4 flex -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-between rounded bg-white p-4 py-10">
          <h1 className="mx-auto rounded-full text-xl">{error}</h1>
        </div>
      </BlankLayout>
    )
  }
  if (!post) return <Loader />

  return (
    <BlankLayout classNames=" w-full bg-neutral-50 ">
      <section className="mx-auto max-w-2xl bg-white p-4">
        <Top post={post} />
        <SecondarySection post={post} isSharing />
        <CompanySection post={post} />
      </section>
    </BlankLayout>
  )
}
