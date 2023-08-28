import IApplication from "@/types/application"
import { Session } from "next-auth"
import Image from "next/image"
import { formatCurrency } from "@/utils/misc"
import { signOut } from "next-auth/react"

type SidebarProps = {
  totalEarnings: number
  potentialEarnings: number
  session: Session | null
  applicants?: IApplication[]
}

export default function SideBar({
  session,
  potentialEarnings,
  totalEarnings,
}: SidebarProps) {
  return (
    <div className="p-4">
      <div className="top-20 col-span-1 h-min w-full max-w-7xl rounded bg-white p-6 py-10 shadow md:sticky md:mx-auto lg:grid">
        <div className="flex flex-col items-center">
          <Image
            src={session?.user.image || "/static/png/user.png"}
            alt="User image"
            height={128}
            width={128}
            className="rounded-full"
          />
          <h1 className="mt-4 text-2xl font-bold">{session?.user.name}</h1>
          <p className="text-gray-500">{session?.user.email}</p>
          <hr className="mt-5 w-full" />
          <div className="mt-5 w-full">
            <p className="text-xl text-gray-500">Rating</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">5</p>
              <p className="text-2xl text-gray-500">/5</p>
            </div>
          </div>
          <div className="mt-5 w-full">
            <p className="text-xl text-gray-500">Potential rewards</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">
                {formatCurrency(potentialEarnings, "USD")}
              </p>
            </div>
          </div>
          <div className="mt-5 w-full">
            <p className="text-xl text-gray-500">Total Earnings</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">
                {formatCurrency(totalEarnings, "USD")}
              </p>
            </div>
          </div>
          <hr className="mt-5 w-full" />
          <div className="mt-4 flex w-full flex-col gap-2">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Profile
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Settings
            </a>
            <a
              href="#"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-gray-500 hover:text-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
