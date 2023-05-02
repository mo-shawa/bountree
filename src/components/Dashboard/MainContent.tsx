import ArrowSVG from "../Misc/ArrowSVG"
import ApplicantCard from "./ApplicantCard"
import IApplication from "@/types/application"
import Link from "next/link"

type Props = {
	applicants?: IApplication[]
}

export default function Content({ applicants }: Props) {
	return (
		<div className=" rounded mx-auto w-full max-w-7xl h-100  grid col-span-2 px-4">
			<div className="flex flex-col justify-center">
				<h1 className="text-4xl font-bold mt-4">Your Referrals</h1>
				<div className="flex flex-col gap-3 mt-4 w-full h-full">
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
								className="text-blue-500 inline-flex items-center"
							>
								See open opportunities{" "}
								<ArrowSVG className=" fill-blue-500 group-hover:fill-blue" />
							</Link>
						</h1>
					)}
				</div>
			</div>
		</div>
	)
}
