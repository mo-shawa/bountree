import { Opportunity } from "@/types/opportunity"
import {
  UsersIcon,
  GlobeAltIcon,
  CakeIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline"
import { ReactElement } from "react"

export default function CompanySection({ post }: { post: Opportunity }) {
  return (
    <div className="col-span-6 py-6 lg:col-span-4">
      <h1 className="text-left text-xl font-semibold text-b-yellow">
        About {post.company.name}
      </h1>
      <p className="my-4 max-w-2xl  ">{post.company.about}</p>
      <div className="grid max-w-xl grid-cols-2 grid-rows-2 gap-4 py-10 ">
        <GridIcon
          text={post.company.employees + " Employees"}
          icon={<UsersIcon height={34} width={34} />}
        />
        <GridIcon
          text={post.company.founded.toString()}
          icon={<CakeIcon width={34} height={34} />}
        />
        <GridIcon
          text={post.company.industry!}
          icon={<BuildingOffice2Icon height={34} width={34} />}
        />
        <a
          className="rounded transition-colors hover:bg-purple-500/10"
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
    <div className="col-span-1 row-span-2 flex items-center gap-4 p-4 md:row-span-1 ">
      {icon}
      <h4 className="text-sm ">{text}</h4>
    </div>
  )
}
