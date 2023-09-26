import { Application } from "@/types/application"
import { classNames, formatCurrency } from "@/utils/misc"
import ArrowSVG from "../Misc/ArrowSVG"
import { statusStyle } from "@/utils/misc"

type Props = Application & {
  open: boolean
}

export default function ApplicantCard({
  createdAt,
  name,
  cv,
  opportunityId,
  status,
  opportunity,
  description,
  secondary,
  linkedin,
  open,
  rejectionFeedback,
}: Props) {
  const { fixed, min, max, currency } = opportunity!.salary

  const salary = fixed
    ? formatCurrency(fixed, currency)
    : `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

  const buttonStyles =
    "btn bg-b-blue-dark text-white shadow hover:bg-b-yellow hover:text-white border-white/10  hover:border-transparent transition-all duration-300 ease-in-out text-sm font-normal"

  return (
    <div className="w-full rounded-md border bg-white p-4 pb-0 shadow transition-all duration-300 ease-in-out focus-within:border-b-yellow hover:border-b-yellow hover:shadow-md">
      <div className="flex  w-full flex-row items-center justify-between ">
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 text-xs font-thin xs:justify-between">
              <a
                href={`/opportunities/${opportunityId}`}
                className="flex items-center gap-2 text-ellipsis whitespace-nowrap hover:text-b-yellow"
              >
                <p>{opportunity?.title}</p>-<p>{opportunity?.company.name}</p>
              </a>
              <div className="flex flex-wrap items-center gap-2">
                <p className="m-0 text-lg font-bold text-black">{name}</p>
              </div>
              <div className="hover:text-blue flex gap-2 text-xs font-thin text-gray-500">
                <p>Applied {new Date(createdAt).toLocaleDateString()}</p>-
                <a href={cv as string}>
                  <p className="group flex items-center font-medium hover:text-b-yellow">
                    View CV
                    <ArrowSVG className="fill-b-yellow group-hover:fill-black" />
                  </p>
                </a>
              </div>
              {status === "rejected" && rejectionFeedback && (
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-xs font-thin text-gray-500">
                    Rejection Feedback
                  </p>
                  <p className="text-sm font-medium text-black">
                    {rejectionFeedback}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-24">
            <span className="flex items-center gap-3 text-xs font-thin text-gray-500 ">
              <div
                className={classNames(
                  "h-2 w-2 rounded-full",
                  statusStyle[status]
                )}
              ></div>
              {status}
            </span>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          open ? "collapse-open pb-4" : "",
          "collapse-arrow collapse mt-4 rounded-b rounded-t-none border-t p-0 transition-colors duration-300 ease-in-out hover:text-b-yellow focus:text-b-yellow"
        )}
      >
        <input tabIndex={0} type="checkbox" className="peer" />
        <div className=" text-md collapse-title px-0 font-semibold peer-checked:text-b-yellow ">
          Details
        </div>
        <div className="collapse-content flex flex-col gap-4 p-0 ">
          {/* Candidate details */}
          <hr />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-thin text-gray-500">Reward</p>
            <p className="text-lg font-medium text-black underline">
              {formatCurrency(opportunity?.reward.amount)}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-thin text-gray-500">Date Posted</p>
              <p className="text-sm font-medium text-black">
                {new Date(opportunity?.createdAt!).toDateString()}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-thin text-gray-500">Category</p>
              <p className="text-sm font-medium text-black">
                {opportunity?.category}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-thin text-gray-500">Position Salary</p>
              <p className="text-sm font-medium text-black">{salary}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-thin text-gray-500">Location</p>
              <p className="text-sm font-medium text-black">
                {opportunity?.location}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-thin text-gray-500">Work from</p>
              <p className="text-sm font-medium text-black">
                {opportunity?.remote ? "Remote" : "Office"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-thin text-gray-500">
              Candidate's Description
            </p>
            <p className="text-justify text-sm font-medium text-black">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-thin text-gray-500">
              Position's Ideal Candidate
            </p>
            <p className="text-justify text-sm font-medium text-black">
              {opportunity?.idealCandidate}
            </p>
          </div>

          <hr />

          <div className="btn-group btn-group-vertical mx-auto lg:btn-group-horizontal">
            <a
              target="_blank"
              href={linkedin as string}
              className={buttonStyles}
            >
              LinkedIn
            </a>
            <a target="_blank" href={cv as string} className={buttonStyles}>
              View Resume
            </a>
            {secondary && (
              <a target="_blank" href={secondary} className={buttonStyles}>
                Secondary Link
              </a>
            )}
            <a
              href={`/opportunities/${opportunityId}`}
              className={buttonStyles}
            >
              View Job Posting
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
