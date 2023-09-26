import ArrowSVG from "../Misc/ArrowSVG"
import ApplicantCard from "./ApplicantCard"
import { Application } from "@/types/application"
import Link from "next/link"

type Props = {
  applicants: Application[]
}

export default function Content({ applicants }: Props) {
  return (
    <div className=" h-100 col-span-2 mx-auto grid w-full  max-w-7xl rounded px-4">
      <div className="flex flex-col justify-center">
        <h1 className="mt-4 text-4xl font-bold">Your Referrals</h1>
        <div className="mt-4 flex h-full w-full flex-col gap-3">
          {applicants && applicants?.length !== 0 ? (
            applicants.map((applicant) => (
              <ApplicantCard
                open={false}
                key={applicant._id as string}
                {...applicant}
              />
            ))
          ) : (
            <h1 className="">
              You have no referrals yet.{" "}
              <Link
                href="/opportunities"
                className="inline-flex items-center text-blue-500"
              >
                See open opportunities{" "}
                <ArrowSVG className=" group-hover:fill-blue fill-blue-500" />
              </Link>
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
