import IOpportunity from "@/types/opportunity"
import Image from "next/image"
import { formatCurrency } from "@/utils/misc"

export default function Top({ post }: { post: IOpportunity }) {
  const { fixed, min, max, currency } = post.salary

  const salary = fixed
    ? formatCurrency(fixed, currency)
    : `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`

  return (
    <div className="col-span-6 mb-10 mt-12 flex h-min w-full flex-row items-center justify-between lg:col-span-4 ">
      <div className="flex h-full w-full flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="flex w-full gap-4">
          <Image
            className="aspect-square rounded-md object-cover shadow"
            src={post.company.image}
            alt="company logo"
            width={80}
            height={80}
          />
          <div className="flex flex-col justify-between">
            <h4 className="text-sm font-semibold uppercase text-b-yellow">
              {post.company.name}
            </h4>
            <p className="text-lg">{post.title}</p>

            <p className=" text-xs">
              {post.remote ? "Remote" : "In Office"} - {post.location} -{" "}
              <span className="font-semibold text-b-yellow">{salary}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
