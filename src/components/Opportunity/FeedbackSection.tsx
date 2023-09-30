import { OpportunityWithApplications } from "@/types/opportunity"
import { Application } from "@/types/application"

export default function FeedbackSection({
  post,
}: {
  post: OpportunityWithApplications
}) {
  const applicationsWithFeedback = post.applications.filter(
    (app: Application) => app.rejectionFeedback
  )
  return (
    <div className="pb-10">
      <div className="col-span-6 py-6 lg:col-span-4 ">
        <h1 className="text-left text-xl font-semibold text-b-yellow">
          Rejection Feedback
        </h1>
        <p className=" my-4 max-w-2xl ">
          To increase your chances of success, we recommend reviewing feedback
          from previous candidates who were not selected for the role to gain a
          better understanding of the requirements.
        </p>
      </div>
      <ul className="ml-5 list-disc md:ml-14 ">
        {applicationsWithFeedback.map((app: Application, i: number) => (
          <li key={app._id as string} className="my-4">
            {`Candidate #${i + 1}: ${app.rejectionFeedback}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
