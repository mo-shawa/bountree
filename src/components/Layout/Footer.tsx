import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative  w-full border-t bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col flex-wrap items-center justify-between gap-4 px-4 py-4 md:flex-row md:flex-nowrap">
        <div className="flex flex-row gap-8">
          <Image
            src="/static/svg/linkedin.svg"
            height={20}
            width={20}
            alt="linkedin"
          />
          <Image
            src="/static/svg/twitter.svg"
            height={16}
            width={20}
            alt="linkedin"
            className="mt-1"
          />
        </div>

        <div className="flex flex-row gap-2 text-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
          <Link className=" text-xs" href="/cookie-policy">
            Cookie Policy
          </Link>

          <Link className=" text-xs" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className=" text-xs" href="/recruiter-contract">
            Recruiter Agreement
          </Link>
        </div>

        <small className=" flex flex-row gap-2">
          <span>2023 bountree</span> <span>© All Right Reserved</span>
        </small>
      </div>
    </footer>
  )
}
