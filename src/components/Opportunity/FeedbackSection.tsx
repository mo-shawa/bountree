import IOpportunity from '@/types/opportunity'
import IApplication from '@/types/application'

export default function FeedbackSection({ post }: { post: IOpportunity }) {
	const applicationsWithFeedback = post.applications.filter(
		(app: IApplication) => app.rejectionFeedback
	)
	return (
		<div className="pb-10">
			<div className="col-span-6 lg:col-span-4 py-6 ">
				<h1 className="text-xl text-left text-b-yellow">Rejection Feedback</h1>
				<p className=" max-w-2xl my-4 ">
					To increase your chances of success, we recommend reviewing feedback
					from previous candidates who were not selected for the role to gain a
					better understanding of the requirements.
				</p>
			</div>
			<ul className="list-disc md:ml-14 ml-5 ">
				{applicationsWithFeedback.map((app: IApplication, i: number) => (
					<li
						key={app._id as string}
						className="my-4"
					>
						{`Candidate #${i + 1}: ${app.rejectionFeedback}`}
					</li>
				))}
			</ul>
		</div>
	)
}
