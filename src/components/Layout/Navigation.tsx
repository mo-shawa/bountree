import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { classNames } from "@/utils/misc"
import HoverButton from "../Misc/HoverButton"

export default function Navigation() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isCurrent = (href: string) => {
    return router.pathname === href
  }

  const isAdmin = session?.user.email.split("@")[1] === "bountree.app" || false
  const navigation = session
    ? [
        {
          name: "Open roles",
          href: "/opportunities",
          current: isCurrent("/opportunities"),
        },
        {
          name: "Dashboard",
          href: "/dashboard",
          current: isCurrent("/dashboard"),
        },
        ...(isAdmin
          ? [{ name: "Admin", href: "/admin", current: isCurrent("/admin") }]
          : []),
      ]
    : [
        // { name: "Referrers", href: "#", current: isCurrent("#") },
        { name: "Product", href: "/product", current: isCurrent("/product") },
        {
          name: "Open Roles",
          href: "/opportunities",
          current: isCurrent("/opportunities"),
        },
        // { name: "Blog", href: "#", current: isCurrent("#") },
        // { name: "FAQ", href: "#", current: isCurrent("#") },
      ]
  return (
    <nav>
      <div
        className="navbar fixed left-1/2 top-2 
      z-50 w-[80rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 transform
      rounded-full bg-white/50 shadow-lg filter backdrop-blur-xl"
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn-ghost btn rounded-full lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm mt-3 w-52 gap-2 bg-base-100 p-2 shadow"
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    className={classNames(
                      item.current ? "bg-b-yellow/20 font-semibold" : "",
                      "cursor-pointer rounded-lg p-4 hover:bg-base-200"
                    )}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/"
            className="mx-4 hidden cursor-pointer text-xl xs:block"
          >
            <Image
              src="/static/svg/bountree.svg"
              alt="Logo"
              width={120}
              height={30}
            />
          </Link>

          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal gap-4 px-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    className={classNames(
                      "cursor-pointer rounded-full transition-colors hover:bg-neutral-100",
                      item.current ? "bg-b-yellow/50 font-semibold" : ""
                    )}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          href="/"
          className="mx-4 block cursor-pointer justify-self-center text-xl xs:hidden"
        >
          <Image src="/static/svg/icon.svg" alt="Icon" width={30} height={30} />
        </Link>
        <div className="navbar-end gap-2">
          {status === "authenticated" ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <Image
                    src={session?.user.image || "/static/png/user.png"}
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm mt-3 w-52 gap-2 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link href="/dashboard" className="p-4">
                    Dashboard
                  </Link>
                </li>

                <li onClick={() => signOut({ callbackUrl: "/" })}>
                  <a className="p-4" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {/* <HoverButton
								type="outline"
								className="hidden lg:flex"
								onClick={signIn}
								target="_self"
							>
								Sign in
							</HoverButton> */}
              <HoverButton
                type="secondary"
                // className="hidden lg:flex"
                onClick={signIn}
                target="_self"
                className="text rounded-l-full rounded-r-full"
              >
                Sign in
              </HoverButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
