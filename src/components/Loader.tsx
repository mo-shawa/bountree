import Layout from "./Layout"

export default function LoaderLayout() {
	return (
		<Layout classNames="bg-b-blue-dark flex justify-center">
			<div
				className=" py-10 bg-white rounded-full flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
			"
			>
				<h1 className="text-xl mx-auto rounded-full">Loading... </h1>
			</div>
		</Layout>
	)
}

export function Loader() {
	return (
		<div
			className=" py-10 bg-white rounded-full flex flex-row justify-between items-center p-4 my-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
		"
		>
			<h1 className="text-xl mx-auto rounded-full">Loading... </h1>
		</div>
	)
}
