import Link from "next/link"
import Layout from "../Layout/Layout"

export default function Unauthorized({ session }: { session: any }) {
	return (
		<Layout classNames="flex items-center justify-center bg-b-blue-dark p-4">
			<div className="p-5 rounded text-red-500 text-center ">
				<h1 className="text-2xl text- font-bold">
					You ({session?.user.email}) are not authorized to view this page.
				</h1>
				<h1 className="text-xl ">Only @bountree.app emails are authorized.</h1>
				<Link className="underline text-white" href="/">
					Click here before we have a problem.
				</Link>
			</div>
		</Layout>
	)
}
