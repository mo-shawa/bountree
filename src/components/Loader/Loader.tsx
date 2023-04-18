import Layout from "../Layout"

type Props = {
	children: React.ReactNode
}

export default function LoaderLayout({ children }: Props) {
	return (
		<Layout classNames="bg-b-blue-dark flex justify-center">
			<div
				className=" flex flex-col justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
			"
			>
				<span className="loader"></span>
				{children}
			</div>
		</Layout>
	)
}

export function Loader({ children }: Props) {
	return (
		<div
			className="flex flex-col justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
		"
		>
			<span className="loader"></span>
			{children}
		</div>
	)
}
