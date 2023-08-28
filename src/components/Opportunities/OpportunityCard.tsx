import Image from "next/image"
import Link from "next/link"
import Pill from "../Misc/Pill"
import { classNames, formatCurrency } from "@/utils/misc"
import { PauseCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import IOpportunity from "@/types/opportunity"

export default function OpportunityCard({
  opportunity,
  className = "",
}: {
  opportunity: IOpportunity
  className?: string
}) {
  const { fixed, min, max, currency } = opportunity.salary

  const salary = fixed
    ? formatCurrency(fixed, currency)
    : `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

  const statusPillLeft = (() => {
    if (["paused", "closed"].includes(opportunity.status)) {
      return (
        <Pill
          className="hidden sm:block "
          type={opportunity.status === "paused" ? "yellow" : "red"}
        >
          {opportunity.status}
        </Pill>
      )
    }
    if (opportunity.badge) {
      return (
        <Pill className="hidden sm:block " type={opportunity.badge.type}>
          {opportunity.badge.text}
        </Pill>
      )
    }
  })()
  const statusPillRight = (() => {
    if (opportunity.status === "paused")
      return (
        <PauseCircleIcon className="absolute bottom-1 right-1 block h-8 w-8 text-yellow-500 sm:hidden" />
      )

    if (opportunity.status === "closed")
      return (
        <XCircleIcon className="absolute bottom-1 right-1 block h-8 w-8 text-red-500 sm:hidden" />
      )

    // if (opportunity.badge)
    // 	return (
    // 		<Pill
    // 			className="block sm:hidden   text-red-500 absolute top-1 right-1"
    // 			type={opportunity.badge.type}
    // 		>
    // 			{opportunity.badge.text}
    // 		</Pill>
    // 	)
  })()

  return (
    <Link
      href={`/opportunities/${opportunity._id}`}
      className={classNames(
        "transition-translate relative my-4 flex w-full flex-row items-center justify-between rounded-md bg-white p-4 text-black shadow-md duration-300 ease-in-out hover:-translate-y-1",
        opportunity.status === "paused" || opportunity.status === "closed"
          ? "opacity-60"
          : "",
        className
      )}
    >
      <div className="relative flex h-full w-full items-center justify-between">
        <div className="flex flex-col gap-4 xs:flex-row">
          <Image
            className="hidden rounded-md object-contain xs:block"
            src={opportunity.company.image}
            alt="company logo"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-2 xs:justify-between">
            <div className="flex items-center gap-2 text-ellipsis whitespace-nowrap">
              <Image
                className="h-8 w-8 rounded-md object-contain xs:hidden"
                src={opportunity.company.image}
                alt="company logo"
                width={80}
                height={80}
              />
              <h4>{opportunity.company.name}</h4>
            </div>
            <div className="flex w-auto flex-wrap items-center gap-2">
              <p className=" m-0 max-w-[80%] text-gray-500 sm:max-w-full md:font-thin ">
                {opportunity.title}
              </p>
              {statusPillLeft}
            </div>
            <div className="flex gap-2 text-xs text-gray-500">
              <p>{opportunity.remote ? "Remote" : "On-Site"}</p>•
              <p>{opportunity.location}</p>•<p>{salary}</p>
            </div>
          </div>
        </div>
        <div id="right" className="absolute right-0 ">
          <p className="text-xl">
            <div className="flex items-center">
              {/* <div className="shadow mr-2 bg-b-yellow rounded-full w-6 h-6 text-sm text-center font-bold">
								β
							</div> */}
              {formatCurrency(
                opportunity.reward.amount,
                opportunity.reward.currency
              )}
            </div>
            <span className="block text-right text-xs text-gray-500 sm:font-thin">
              reward
            </span>
          </p>
        </div>
      </div>
      {statusPillRight}
    </Link>
  )
}
