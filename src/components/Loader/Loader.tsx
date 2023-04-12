import Layout from "../Layout"

export default function LoaderLayout() {
	return (
		<Layout classNames="bg-b-blue-dark flex justify-center">
			<div
				className=" flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
			"
			>
				<span className="loader"></span>
			</div>
		</Layout>
	)
}

export function Loader() {
	return (
		<div
			className="flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
		"
		>
			<span className="loader"></span>
		</div>
	)
}
