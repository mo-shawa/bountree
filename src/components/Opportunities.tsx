import { useState, useEffect } from "react"
import Opportunity from "./Opportunity"
import Filter from "./Filter"
import IOpportunity from "@/types/Opportunity"
import { Loader } from "./Loader"

export default function Opportunities(props: any) {
	const [filteredData, setFilteredData] = useState<IOpportunity[]>(props.data)
	const [filteredBy, setFilteredBy] = useState<string>("All roles")

	useEffect(() => {
		setFilteredData(props.data)
	}, [props.data])

	useEffect(() => {
		if (filteredBy === "All roles") setFilteredData(props.data)

		if (filteredBy !== "All roles") {
			const dataCopy = structuredClone(props.data)

			const filteredData = dataCopy.filter(
				(element: any) => element.category === filteredBy
			)
			setFilteredData(() => filteredData)
		}
	}, [filteredBy, props.data])

	if (props.data.length === 0) return <Loader />

	return (
		<>
			<section className="bg-b-blue-dark">
				<div className="mx-auto px-4 w-full max-w-7xl">
					<Filter filteredBy={filteredBy} setFilteredBy={setFilteredBy} />
					{filteredData.length ? (
						filteredData.map((item) => (
							<Opportunity
								id={item._id}
								key={item._id}
								company={item.company.name}
								image={"https://via.placeholder.com/80"}
								slogan={item.company.slogan}
								role={{
									title: item.title,
									category: item.category,
									workFrom: item.remote ? "Remote" : "In person",
									location: item.location,
									salary: `$${item.salary.min.toLocaleString()} - $${item.salary.max.toLocaleString()}`,
									reward: `$${item.reward.amount.toLocaleString()}`,
								}}
							/>
						))
					) : (
						<div className="w-full bg-white rounded-md flex flex-row justify-between items-center p-4 my-4">
							<h1 className="text-xl mx-auto">
								No opportunities match the given filter
							</h1>
						</div>
					)}
				</div>
			</section>
		</>
	)
}
