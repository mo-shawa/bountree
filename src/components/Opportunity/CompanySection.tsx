import IOpportunity from "@/types/opportunity"
import Image from "next/image"
import {
	UsersIcon,
	GlobeAltIcon,
	CakeIcon,
	BuildingOffice2Icon,
} from "@heroicons/react/24/outline"
import { ReactElement } from "react"

export default function CompanySection({ post }: { post: IOpportunity }) {
	return (
		<div className="col-span-6 lg:col-span-4 py-6">
			<h1 className="text-xl text-left text-b-yellow">
				About {post.company.name}
			</h1>
			<p className="max-w-2xl my-4  ">{post.company.about}</p>
			<div className="grid max-w-xl grid-cols-2 gap-4 grid-rows-2 py-10 ">
				<GridIcon
					text={post.company.employees + " Employees"}
					icon={<UsersIcon height={34} width={34} />}
				/>
				<GridIcon
					text={post.company.founded}
					icon={<CakeIcon width={34} height={34} />}
				/>
				<GridIcon
					text={post.company.industry}
					icon={<BuildingOffice2Icon height={34} width={34} />}
				/>
				<a
					className="hover:bg-purple-500/10 rounded transition-colors"
					target="_blank"
					href={post.company.url}
				>
					<GridIcon
						text="Website"
						icon={<GlobeAltIcon height={34} width={34} />}
					/>
				</a>
			</div>
		</div>
	)
}

function GridIcon({ icon, text }: { icon: ReactElement; text: string }) {
	return (
		<div className="col-span-1 row-span-2 md:row-span-1 flex items-center gap-4 p-4 ">
			{icon}
			<h4 className="text-sm ">{text}</h4>
		</div>
	)
}
