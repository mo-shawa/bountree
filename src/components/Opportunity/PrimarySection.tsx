import IOpportunity from "@/types/opportunity"
import { Application } from "@/types/application"
import Top from "./Top"
import ReferralCard from "./ReferralCard"
import SecondarySection from "./SecondarySection"
import CompanySection from "./CompanySection"
import FeedbackSection from "./FeedbackSection"

export default function PrimarySection({
  post,
  applicationsRemaining,
  setModalOpen,
  isAdmin,
}: {
  post: IOpportunity
  applicationsRemaining: number
  setModalOpen: (open: boolean) => void
  isAdmin: boolean
}) {
  const hasRejectionFeedback = post.applications.some(
    (a: Application) => a.status === "rejected" && a.rejectionFeedback
  )
  return (
    <div className="col-span-6 mr-2 lg:col-span-4">
      <Top post={post} />

      <ReferralCard
        mobile={true}
        post={post}
        applicationsRemaining={applicationsRemaining}
        setModalOpen={setModalOpen}
        isAdmin={isAdmin}
      />
      <SecondarySection post={post} />
      <CompanySection post={post} />
      {hasRejectionFeedback && <FeedbackSection post={post} />}
    </div>
  )
}
