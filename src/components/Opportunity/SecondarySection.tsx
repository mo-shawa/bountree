import IOpportunity from "@/types/opportunity"

type Props = {
  post: IOpportunity
  isSharing?: boolean
}

export default function SecondarySection({ post, isSharing = false }: Props) {
  return (
    <div>
      <div className="pb-5 md:py-6">
        <h1 className="text-left text-xl font-semibold text-b-yellow">
          Role Description
        </h1>
        <p className=" my-4 max-w-2xl text-justify ">{post.description}</p>
      </div>
      <div className="pb-5 md:py-6">
        <h1 className="text-left text-xl font-semibold text-b-yellow">
          The Ideal Candidate
        </h1>
        <p className=" my-4 max-w-2xl text-justify ">{post.idealCandidate}</p>
      </div>
      {isSharing && (
        <div className="py-6 ">
          <h1 className="text-left text-xl font-semibold text-b-yellow">
            Position Requirements
          </h1>

          <ul className="ml-5 list-disc md:ml-14 ">
            {post.requirements.map((item: string, i: number) => {
              return (
                <li key={i} className="my-4">
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <div className="py-6 ">
        <h1 className="text-left text-xl font-semibold text-b-yellow">
          Role Perks
        </h1>
        {post.perks.description && (
          <p className=" my-4 max-w-2xl ">{post.perks.description}</p>
        )}
        {post.perks.items.length > 0 ? (
          <ol className="ml-5 list-decimal md:ml-14 ">
            {post.perks.items.map((item: string, i: number) => {
              return (
                <li key={i} className="my-4">
                  {item}
                </li>
              )
            })}
          </ol>
        ) : (
          <p className=" my-4 max-w-2xl ">No perks listed</p>
        )}
      </div>
    </div>
  )
}
